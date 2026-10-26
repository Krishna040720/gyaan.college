// GYAAN.AI Voice AI Diagnostic Logs & Inspection Admin Screen
// Implements Phase 1 Voice Query Logging:
// - Raw STT transcript & STT confidence score
// - Top 5 retrieved chunks with rank, score, and title metadata
// - Final constructed LLM prompt
// - Generated answer & latency
// - Root cause visual diagnostic for "electricity -> bar magnet" mismatch

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Activity, 
  Search, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  Trash2, 
  Clock, 
  ChevronRight, 
  ChevronDown,
  Terminal, 
  Sliders, 
  HelpCircle,
  ExternalLink,
  Layers,
  ArrowRight,
  Send,
  Zap,
  Volume2,
  ShieldAlert
} from 'lucide-react';
import { soundService } from '../../services/soundService';
import { authService } from '../../services/authService';

export default function VoiceDebugAdmin({ onClose }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLog, setSelectedLog] = useState(null);
  const [filterStage, setFilterStage] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('trace'); // 'trace' | 'test'
  
  // Interactive Live Query Tester State
  const [testInput, setTestInput] = useState('electricity');
  const [testConfidence, setTestConfidence] = useState(0.96);
  const [forceChapter, setForceChapter] = useState(true);
  const [useHybrid, setUseHybrid] = useState(false);
  const [strictPrompt, setStrictPrompt] = useState(false);
  const [submittingTest, setSubmittingTest] = useState(false);

  const getAdminHeaders = useCallback(() => {
    const user = authService.getAuthUser();
    return {
      'x-user-role': user?.role || 'admin'
    };
  }, []);

  // Fetch logs from FastAPI backend
  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/voice/logs?limit=50', {
        headers: getAdminHeaders()
      });
      if (res.status === 403) {
        setError('Access Forbidden: Admin privileges required to view voice debug logs.');
        setLogs([]);
        return;
      }
      if (!res.ok) {
        throw new Error(`Failed to fetch logs: HTTP ${res.status}`);
      }
      const data = await res.json();
      setLogs(data);
      if (data.length > 0 && !selectedLog) {
        setSelectedLog(data[0]);
      }
    } catch (err) {
      console.error('[VoiceDebugAdmin] Fetch error:', err);
      setError(err.message || 'Failed to connect to Voice AI backend');
    } finally {
      setLoading(false);
    }
  }, [selectedLog, getAdminHeaders]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // Clean up logs older than 7 days
  const handlePruneLogs = async () => {
    soundService.playClick();
    setLoading(true);
    try {
      const res = await fetch('/api/voice/cleanup?days=7', { 
        method: 'POST',
        headers: getAdminHeaders()
      });
      if (res.ok) {
        const result = await res.json();
        alert(`Cleanup complete: ${result.deleted_count || 0} expired logs (>7 days) deleted.`);
        await fetchLogs();
      }
    } catch (err) {
      console.error('Prune logs error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Clear Logs
  const handleClearLogs = async () => {
    if (!window.confirm('Are you sure you want to clear all voice query debug logs?')) return;
    soundService.playClick();
    setLoading(true);
    try {
      await fetch('/api/voice/logs', { 
        method: 'DELETE',
        headers: getAdminHeaders()
      });
      setLogs([]);
      setSelectedLog(null);
    } catch (err) {
      console.error('Clear logs error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Submit Interactive Test Query
  const handleRunTestQuery = async (e) => {
    e?.preventDefault();
    if (!testInput.trim()) return;
    setSubmittingTest(true);
    soundService.playClick();
    try {
      const res = await fetch('/api/voice/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: testInput.trim(),
          confidence: Number(testConfidence),
          board_id: 'cbse',
          class_level: 10,
          subject_id: 'science',
          current_chapter_id: 'cbse-10-science-ch12', // Magnetic Effects of Electric Current
          force_current_chapter: forceChapter,
          use_hybrid_retrieval: useHybrid,
          strict_llm_prompt: strictPrompt
        })
      });
      if (res.ok) {
        const newLog = await res.json();
        setLogs(prev => [newLog, ...prev]);
        setSelectedLog(newLog);
      }
    } catch (err) {
      console.error('Test query error:', err);
    } finally {
      setSubmittingTest(false);
    }
  };

  // Filter logs
  const filteredLogs = logs.filter(log => {
    const matchesStage = filterStage === 'all' || log.diagnosed_stage === filterStage;
    const matchesSearch = !searchQuery || 
      log.raw_stt_transcript?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.final_answer?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesSearch;
  });

  const mismatchCount = logs.filter(l => l.diagnosed_stage === 'retrieval_mismatch').length;
  const healthyCount = logs.filter(l => l.diagnosed_stage === 'healthy').length;
  const avgConfidence = logs.length > 0 
    ? (logs.reduce((acc, l) => acc + (l.stt_confidence || 0), 0) / logs.length).toFixed(2)
    : '1.00';

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Bar */}
      <div className="bg-white rounded-3xl border border-[#E5E0EE] p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E0EE] pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#56358B]/10 flex items-center justify-center text-[#56358B] shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-[#221E2C]">Voice AI Diagnostics & Logs</h1>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#14A89A]/15 text-[#14A89A] border border-[#14A89A]/30">
                  Phase 1 Logging Active
                </span>
              </div>
              <p className="text-xs text-[#6C667A] mt-0.5">
                Inspect raw speech transcripts, retrieval ranking (top 5 chunks), LLM prompt assembly, and root cause diagnosis.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handlePruneLogs}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#FAF9FC] hover:bg-[#F2EFF7] text-[#56358B] border border-[#E5E0EE] transition cursor-pointer"
              title="Delete debug logs older than 7 days"
            >
              <Clock className="w-3.5 h-3.5 text-[#56358B]" />
              <span>Prune Expired (&gt;7d)</span>
            </button>

            <button
              onClick={fetchLogs}
              disabled={loading}
              className="p-2 rounded-xl bg-white hover:bg-[#FAF9FC] text-[#6C667A] border border-[#E5E0EE] transition cursor-pointer"
              title="Refresh logs"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#56358B]' : ''}`} />
            </button>

            <button
              onClick={handleClearLogs}
              disabled={loading || logs.length === 0}
              className="p-2 rounded-xl bg-white hover:bg-rose-50 text-rose-600 border border-[#E5E0EE] hover:border-rose-200 transition cursor-pointer"
              title="Clear all logs"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white hover:bg-[#FAF9FC] text-[#6C667A] border border-[#E5E0EE] transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Diagnostic Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5">
          <div className="p-3.5 rounded-2xl bg-[#FAF9FC] border border-[#E5E0EE]">
            <div className="text-[11px] font-bold text-[#6C667A] uppercase tracking-wider">Total Queries</div>
            <div className="text-2xl font-black text-[#221E2C] mt-1">{logs.length}</div>
            <div className="text-[10px] text-[#6C667A] mt-0.5">Stored in SQLite debug table</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF9FC] border border-[#E5E0EE]">
            <div className="text-[11px] font-bold text-[#6C667A] uppercase tracking-wider">Avg STT Confidence</div>
            <div className="text-2xl font-black text-[#14A89A] mt-1">{(Number(avgConfidence) * 100).toFixed(0)}%</div>
            <div className="text-[10px] text-[#6C667A] mt-0.5">High speech recognition fidelity</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/70">
            <div className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Retrieval Mismatches</span>
            </div>
            <div className="text-2xl font-black text-amber-900 mt-1">{mismatchCount}</div>
            <div className="text-[10px] text-amber-700 mt-0.5">Diagnosed root cause cases</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/70">
            <div className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Healthy Responses</span>
            </div>
            <div className="text-2xl font-black text-emerald-900 mt-1">{healthyCount}</div>
            <div className="text-[10px] text-emerald-700 mt-0.5">Grounded topic resolution</div>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
          <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Root Cause Alert Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-amber-50 border border-amber-200 text-amber-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-200/80 flex items-center justify-center text-amber-800 shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-amber-900">
              Root Cause Diagnosis: Why &ldquo;electricity&rdquo; answered about &ldquo;bar magnets&rdquo;
            </h4>
            <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
              <strong>STT was innocent (confidence: 96%)</strong>. The bug occurred in the <strong>Retrieval Stage</strong>: because the workspace was viewing Chapter 12 (<em>Magnetic Effects of Electric Current</em>), retrieval was <em>forced to the current chapter</em>. Chunks mentioning <em>&ldquo;Bar magnet as an equivalent solenoid&rdquo;</em> scored highest. In the <strong>Prompting Stage</strong>, the LLM lacked strict negative boundaries, so it answered about bar magnets.
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setTestInput('electricity');
            setForceChapter(false);
            setUseHybrid(true);
            setStrictPrompt(true);
            setActiveTab('test');
          }}
          className="whitespace-nowrap px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-xs cursor-pointer shrink-0"
        >
          Verify Fix in Test Sandbox →
        </button>
      </div>

      {/* Interactive Query Tester Tab / Section */}
      <div className="bg-white rounded-3xl border border-[#E5E0EE] p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#E5E0EE] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#56358B]" />
            <h3 className="font-bold text-sm text-[#221E2C]">Voice AI Pipeline Test Sandbox</h3>
          </div>
          <span className="text-[11px] text-[#6C667A]">Simulate voice queries with configurable pipeline parameters</span>
        </div>

        <form onSubmit={handleRunTestQuery} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2 space-y-1">
              <label className="text-[11px] font-bold text-[#6C667A] uppercase tracking-wider">
                Spoken Input / Transcript
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  placeholder="e.g. electricity, what is ohm's law, bar magnet..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E0EE] focus:border-[#56358B] focus:ring-1 focus:ring-[#56358B] text-sm text-[#221E2C] font-medium outline-hidden"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#6C667A] uppercase tracking-wider">
                Simulated STT Confidence ({(testConfidence * 100).toFixed(0)}%)
              </label>
              <input
                type="range"
                min="0.30"
                max="1.00"
                step="0.02"
                value={testConfidence}
                onChange={(e) => setTestConfidence(parseFloat(e.target.value))}
                className="w-full mt-2 accent-[#56358B] cursor-pointer"
              />
            </div>
          </div>

          {/* Pipeline Diagnostic Flags */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <label className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition ${
              forceChapter ? 'bg-amber-50/60 border-amber-300 text-amber-900' : 'bg-[#FAF9FC] border-[#E5E0EE] text-[#4A4556]'
            }`}>
              <input
                type="checkbox"
                checked={forceChapter}
                onChange={(e) => setForceChapter(e.target.checked)}
                className="mt-0.5 rounded-sm text-[#56358B] focus:ring-[#56358B]"
              />
              <div className="text-xs">
                <span className="font-bold block">Force Current Chapter</span>
                <span className="text-[11px] opacity-80">(The legacy bug: locks to Ch 12 Magnetic Effects)</span>
              </div>
            </label>

            <label className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition ${
              useHybrid ? 'bg-[#14A89A]/10 border-[#14A89A]/40 text-[#14A89A]' : 'bg-[#FAF9FC] border-[#E5E0EE] text-[#4A4556]'
            }`}>
              <input
                type="checkbox"
                checked={useHybrid}
                onChange={(e) => setUseHybrid(e.target.checked)}
                className="mt-0.5 rounded-sm text-[#14A89A] focus:ring-[#14A89A]"
              />
              <div className="text-xs">
                <span className="font-bold block">Hybrid Search & Re-rank</span>
                <span className="text-[11px] opacity-80">(Phase 3: keyword + vector across entire subject)</span>
              </div>
            </label>

            <label className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition ${
              strictPrompt ? 'bg-[#56358B]/10 border-[#56358B]/40 text-[#56358B]' : 'bg-[#FAF9FC] border-[#E5E0EE] text-[#4A4556]'
            }`}>
              <input
                type="checkbox"
                checked={strictPrompt}
                onChange={(e) => setStrictPrompt(e.target.checked)}
                className="mt-0.5 rounded-sm text-[#56358B] focus:ring-[#56358B]"
              />
              <div className="text-xs">
                <span className="font-bold block">Strict Grounded Prompt</span>
                <span className="text-[11px] opacity-80">(Phase 4: prevents drifting to related topics)</span>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="submit"
              disabled={submittingTest}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#56358B] hover:bg-[#482C75] text-white text-xs font-bold shadow-xs transition cursor-pointer"
            >
              {submittingTest ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing Voice Query...</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5" />
                  <span>Execute Voice Pipeline</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Main Logs Table and Trace Inspector Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Trace Logs Table (5 cols on lg) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E5E0EE] p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#221E2C] flex items-center gap-2">
                <span>Recent Query Traces</span>
                <span className="text-xs font-normal text-[#6C667A]">({filteredLogs.length})</span>
              </h3>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all', label: 'All' },
                { id: 'retrieval_mismatch', label: 'Mismatches', color: 'text-rose-700 bg-rose-50' },
                { id: 'healthy', label: 'Healthy', color: 'text-emerald-700 bg-emerald-50' },
                { id: 'stt_low_confidence', label: 'Low STT', color: 'text-amber-700 bg-amber-50' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilterStage(tab.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    filterStage === tab.id
                      ? 'bg-[#56358B] text-white shadow-2xs font-bold'
                      : 'bg-[#FAF9FC] text-[#6C667A] hover:text-[#221E2C]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#6C667A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search queries or answers..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-[#FAF9FC] border border-[#E5E0EE] focus:border-[#56358B] outline-hidden"
              />
            </div>
          </div>

          {/* Logs List */}
          <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
            {loading && logs.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#6C667A] space-y-2">
                <RefreshCw className="w-5 h-5 animate-spin mx-auto text-[#56358B]" />
                <p>Loading voice query traces...</p>
              </div>
            ) : filteredLogs.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#6C667A] bg-[#FAF9FC] rounded-2xl border border-dashed border-[#E5E0EE]">
                No matching voice logs found.
              </div>
            ) : (
              filteredLogs.map(log => {
                const isSelected = selectedLog?.id === log.id;
                const isMismatch = log.diagnosed_stage === 'retrieval_mismatch';
                const isHealthy = log.diagnosed_stage === 'healthy';
                const topChunk = log.retrieved_chunks?.[0];

                return (
                  <div
                    key={log.id}
                    onClick={() => {
                      soundService.playClick();
                      setSelectedLog(log);
                    }}
                    className={`p-3 rounded-2xl border transition cursor-pointer text-left space-y-2 ${
                      isSelected
                        ? 'bg-[#56358B]/5 border-[#56358B] shadow-xs ring-1 ring-[#56358B]'
                        : 'bg-white hover:bg-[#FAF9FC] border-[#E5E0EE]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Volume2 className="w-3.5 h-3.5 text-[#56358B] shrink-0" />
                        <span className="font-bold text-xs text-[#221E2C] truncate">
                          &ldquo;{log.raw_stt_transcript}&rdquo;
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 uppercase tracking-wider ${
                        isMismatch 
                          ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                          : isHealthy
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {isMismatch ? 'Mismatch' : log.diagnosed_stage}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#6C667A]">
                      <span className="truncate max-w-[180px]">
                        Top: {topChunk ? topChunk.topic_title : 'No chunks'}
                      </span>
                      <span className="shrink-0 font-medium text-[10px]">
                        STT: {(log.stt_confidence * 100).toFixed(0)}%
                      </span>
                    </div>

                    <div className="text-[11px] text-[#4A4556] line-clamp-1 italic">
                      &rarr; {log.final_answer}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Complete 5-Stage Trace Inspector (7 cols on lg) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E5E0EE] p-5 sm:p-6 shadow-xs space-y-6">
          {selectedLog ? (
            <>
              {/* Trace Header */}
              <div className="border-b border-[#E5E0EE] pb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-base text-[#221E2C]">Full Query Diagnostic Trace</h3>
                    <span className="text-[10px] font-mono text-[#6C667A] px-2 py-0.5 bg-[#FAF9FC] rounded-md border border-[#E5E0EE]">
                      ID: {selectedLog.id}
                    </span>
                  </div>
                  <div className="text-xs text-[#6C667A] mt-1 flex items-center gap-3">
                    <span>Latency: <strong>{selectedLog.latency_ms}ms</strong></span>
                    <span>•</span>
                    <span>Strategy: <strong>{selectedLog.retrieval_strategy || 'vector_only'}</strong></span>
                    <span>•</span>
                    <span>Board: <strong>{(selectedLog.board_id || 'cbse').toUpperCase()} Class {selectedLog.class_level || 10}</strong></span>
                  </div>
                </div>

                <div className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${
                  selectedLog.diagnosed_stage === 'retrieval_mismatch'
                    ? 'bg-rose-50 text-rose-800 border-rose-200'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}>
                  {selectedLog.diagnosed_stage === 'retrieval_mismatch' ? (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Retrieval Stage Root Cause</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Pipeline Healthy</span>
                    </>
                  )}
                </div>
              </div>

              {/* 1. Speech-to-Text Stage */}
              <div className="p-4 rounded-2xl bg-[#FAF9FC] border border-[#E5E0EE] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#56358B] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    <span>Stage 1: Speech-to-Text (STT) Intake</span>
                  </span>
                  <span className="font-bold text-[#221E2C]">
                    Confidence: {(selectedLog.stt_confidence * 100).toFixed(0)}%
                  </span>
                </div>
                
                <div className="p-3 rounded-xl bg-white border border-[#E5E0EE] text-sm font-semibold text-[#221E2C]">
                  &ldquo;{selectedLog.raw_stt_transcript}&rdquo;
                </div>

                {selectedLog.user_edited_transcript && (
                  <div className="text-xs text-[#14A89A]">
                    Student edited to: <strong>&ldquo;{selectedLog.user_edited_transcript}&rdquo;</strong>
                  </div>
                )}
              </div>

              {/* 2. Top 5 Retrieved Chunks with Scores */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#56358B] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    <span>Stage 2: Top 5 Retrieved Curriculum Chunks</span>
                  </span>
                  <span className="text-xs text-[#6C667A]">
                    Retrieval Score: {(selectedLog.retrieval_confidence * 100).toFixed(0)}%
                  </span>
                </div>

                <div className="space-y-2">
                  {selectedLog.retrieved_chunks && selectedLog.retrieved_chunks.map((chunk, idx) => {
                    const isMismatchedChunk = selectedLog.diagnosed_stage === 'retrieval_mismatch' && idx === 0;
                    return (
                      <div
                        key={chunk.chunk_id || idx}
                        className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                          isMismatchedChunk
                            ? 'bg-rose-50/50 border-rose-200 ring-1 ring-rose-300'
                            : 'bg-[#FAF9FC] border-[#E5E0EE]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#56358B]/10 text-[#56358B] flex items-center justify-center font-bold text-[10px]">
                              #{chunk.rank || idx + 1}
                            </span>
                            <span className="font-bold text-[#221E2C]">{chunk.topic_title}</span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="px-2 py-0.5 rounded-md bg-white border border-[#E5E0EE] font-mono text-[10px] text-[#56358B] font-bold">
                              Score: {chunk.score?.toFixed(2) || '0.00'}
                            </span>
                          </div>
                        </div>

                        <div className="text-[11px] text-[#6C667A]">
                          Chapter: <strong>{chunk.chapter_title}</strong> (ID: {chunk.chapter_id})
                        </div>

                        <p className="text-[11px] text-[#4A4556] leading-relaxed line-clamp-2">
                          {chunk.content}
                        </p>

                        {isMismatchedChunk && (
                          <div className="text-[10px] text-rose-700 font-bold bg-rose-100/70 p-1.5 rounded-md mt-1">
                            &uarr; MISMATCH ROOT CAUSE: Query asked &ldquo;{selectedLog.raw_stt_transcript}&rdquo;, but current chapter filter forced retrieval to {chunk.chapter_title}!
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Final Constructed LLM Prompt */}
              <div className="space-y-2">
                <span className="font-bold text-[#56358B] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <span>Stage 3: Assembled LLM Prompt</span>
                </span>
                <div className="p-3.5 rounded-xl bg-[#221E2C] text-purple-200 font-mono text-xs max-h-48 overflow-y-auto leading-relaxed border border-[#3E384D]">
                  <pre className="whitespace-pre-wrap">{selectedLog.final_llm_prompt}</pre>
                </div>
              </div>

              {/* 4. Final Spoken Educational Response */}
              <div className="space-y-2">
                <span className="font-bold text-[#56358B] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <span>Stage 4: Final AI Tutor Answer</span>
                </span>
                <div className="p-4 rounded-2xl bg-white border border-[#E5E0EE] shadow-xs text-sm text-[#221E2C] leading-relaxed">
                  {selectedLog.final_answer}
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-xs text-[#6C667A] space-y-2">
              <Activity className="w-8 h-8 mx-auto text-[#6C667A]/50" />
              <p>Select a query from the left list to inspect its full diagnostic trace.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
