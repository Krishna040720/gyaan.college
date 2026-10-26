// GYAAN AI Branching Concept Mind Map Component
// Renders an authentic educational hierarchy tree:
// Chapter -> Units (when present) -> Topics -> Subtopics -> Nested Subtopics
// Features SVG branching curves, dynamic node layout without overlaps, zoom/pan/fit controls,
// expand/collapse branches, docked node inspector drawer, and responsive mobile tree.

import React, { useState, useMemo, useRef } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  GitBranch, 
  Mic, 
  FileText, 
  CheckCircle, 
  ChevronRight, 
  ChevronDown, 
  X
} from 'lucide-react';
import { curriculumHierarchyService } from '../../services/curriculumHierarchyService';
import { progressService, getMasteryCategory } from '../../services/progressService';
import { soundService } from '../../services/soundService';
import { IMPORTANCE_LEVELS } from '../../data/curriculumHierarchyData';

export default function ConceptMindMap({
  chapter,
  context = {},
  selectedConceptId,
  onSelectConcept,
  onOpenNotes,
  onOpenPractice
}) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState(null);
  const [collapsedBranches, setCollapsedBranches] = useState({});
  const [mobileViewMode, setMobileViewMode] = useState('tree'); // 'tree' | 'canvas'

  const containerRef = useRef(null);

  // 1. Resolve canonical hierarchy from shared service
  const hierarchy = useMemo(() => {
    if (!chapter) return null;
    return curriculumHierarchyService.getChapterHierarchy(chapter, context);
  }, [chapter, context]);

  // Toggle expand/collapse for a branch node
  const toggleBranch = (nodeId, e) => {
    if (e) e.stopPropagation();
    soundService.playClick();
    setCollapsedBranches(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const handleNodeClick = (node, e) => {
    if (e) e.stopPropagation();
    soundService.playClick();
    setSelectedNode(node);
    if (onSelectConcept && (node.type === 'topic' || node.type === 'subtopic')) {
      onSelectConcept({
        id: node.conceptId || node.id,
        title: node.title,
        chapterTitle: hierarchy?.chapterTitle || chapter?.title,
        chapterId: hierarchy?.chapterId || chapter?.id,
        description: node.description,
        mustKnowPoints: node.keyTakeaways || [node.description]
      });
    }
  };

  // Zoom controls
  const handleZoomIn = () => {
    soundService.playClick();
    setZoomLevel(z => Math.min(2.0, Number((z + 0.15).toFixed(2))));
  };

  const handleZoomOut = () => {
    soundService.playClick();
    setZoomLevel(z => Math.max(0.5, Number((z - 0.15).toFixed(2))));
  };

  const handleResetZoom = () => {
    soundService.playClick();
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleFitToScreen = () => {
    soundService.playClick();
    setZoomLevel(0.85);
    setPanOffset({ x: 40, y: 20 });
  };

  // Mouse pan handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only main button
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 2. Tree Layout Algorithm with dynamic vertical leaf spacing (No label overlaps)
  const treeLayout = useMemo(() => {
    if (!hierarchy) return { nodes: [], edges: [], canvasWidth: 1000, canvasHeight: 600 };

    const nodes = [];
    const edges = [];
    const ROW_HEIGHT = 72;
    const HORIZONTAL_SPACING = 300;

    // Helper: calculate leaf units of a subtree (taking collapsed state into account)
    const computeSubtreeLeafUnits = (node) => {
      const isCollapsed = Boolean(collapsedBranches[node.id]);
      if (isCollapsed) return 1;

      const children = (node.units || node.topics || node.subtopics || []);
      if (children.length === 0) return 1;

      return children.reduce((sum, child) => sum + computeSubtreeLeafUnits(child), 0);
    };

    let currentLeafRow = 0;

    // Recursive layout pass
    const layoutNode = (node, depth, parentNode = null, lineage = []) => {
      const currentLineage = [...lineage, node.title || node.chapterTitle];
      const isCollapsed = Boolean(collapsedBranches[node.id]);
      const children = (node.units || node.topics || node.subtopics || []);

      let yPos;

      if (children.length === 0 || isCollapsed) {
        // Leaf or collapsed node gets next vertical slot
        yPos = currentLeafRow * ROW_HEIGHT + 70;
        currentLeafRow += 1;
      } else {
        // Parent node centers around its visible children
        const childPositions = children.map(child => 
          layoutNode(child, depth + 1, node, currentLineage)
        );
        const firstChildY = childPositions[0].y;
        const lastChildY = childPositions[childPositions.length - 1].y;
        yPos = (firstChildY + lastChildY) / 2;
      }

      const xPos = 120 + depth * HORIZONTAL_SPACING;

      const nodeObj = {
        id: node.id || hierarchy.chapterId,
        type: node.type || (depth === 0 ? 'root' : 'topic'),
        title: node.title || hierarchy.chapterTitle,
        description: node.description || hierarchy.source || '',
        order: node.order || node.unitNumber || 1,
        importance: node.importance || IMPORTANCE_LEVELS.BOARD_STANDARD,
        conceptId: node.conceptId || node.id,
        keyTakeaways: node.keyTakeaways,
        x: xPos,
        y: yPos,
        depth,
        lineage: currentLineage,
        hasChildren: children.length > 0,
        isCollapsed,
        childCount: children.length,
        rawNode: node
      };

      nodes.push(nodeObj);

      if (parentNode) {
        edges.push({
          id: `edge-${parentNode.id}-${nodeObj.id}`,
          fromId: parentNode.id,
          toId: nodeObj.id,
          fromX: parentNode.x + 90,
          fromY: parentNode.y,
          toX: nodeObj.x - 90,
          toY: nodeObj.y
        });
      }

      return nodeObj;
    };

    // Root Chapter Node
    const rootData = {
      id: hierarchy.chapterId,
      type: 'root',
      title: hierarchy.chapterTitle,
      description: hierarchy.source || 'Curriculum Chapter Root',
      units: hierarchy.hasUnits ? hierarchy.units : undefined,
      topics: !hierarchy.hasUnits ? hierarchy.topics : undefined
    };

    layoutNode(rootData, 0, null, []);

    const maxDepth = nodes.reduce((max, n) => Math.max(max, n.depth), 0);
    const canvasWidth = Math.max(1050, 160 + (maxDepth + 1) * HORIZONTAL_SPACING);
    const canvasHeight = Math.max(540, currentLeafRow * ROW_HEIGHT + 140);

    return { nodes, edges, canvasWidth, canvasHeight };
  }, [hierarchy, collapsedBranches]);

  const getMasteryCategoryForNode = (conceptId, nodeId) => {
    const targetId = conceptId || nodeId;
    const progress = progressService.getConceptProgress(targetId);
    return getMasteryCategory(progress.mastery, progress.isAssessed);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-[#E9E5EF] shadow-xs overflow-hidden flex flex-col text-[#25212B]">
      
      {/* Header bar with Mode Switcher & Zoom Controls */}
      <div className="p-4 border-b border-[#E9E5EF] flex flex-wrap items-center justify-between gap-3 bg-[#FAF9FC]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-[#16A39A]/15 border border-[#16A39A]/30 flex items-center justify-center text-[#16A39A]">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-[#25212B] flex items-center gap-2">
              <span>Chapter Mind Map:</span>
              <span className="text-[#56358B]">{hierarchy?.chapterTitle}</span>
            </h4>
            <p className="text-[11px] text-[#777381]">
              {hierarchy?.hasUnits ? 'Hierarchical structure: Chapter → Units → Topics → Subtopics' : 'Direct structure: Chapter → Topics → Subtopics'}
            </p>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2">
          
          {/* Mobile View Toggle */}
          <div className="flex sm:hidden items-center bg-white p-0.5 rounded-xl border border-[#E9E5EF] text-xs">
            <button
              onClick={() => setMobileViewMode('tree')}
              className={`px-2 py-1 rounded-lg font-bold text-[10px] ${mobileViewMode === 'tree' ? 'bg-[#56358B] text-white' : 'text-[#777381]'}`}
            >
              Tree
            </button>
            <button
              onClick={() => setMobileViewMode('canvas')}
              className={`px-2 py-1 rounded-lg font-bold text-[10px] ${mobileViewMode === 'canvas' ? 'bg-[#16A39A] text-white' : 'text-[#777381]'}`}
            >
              Canvas
            </button>
          </div>

          {/* Desktop Zoom & Reset Controls */}
          <div className="hidden sm:flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E9E5EF] text-xs">
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg hover:bg-[#FAF9FC] text-[#777381] hover:text-[#25212B] transition"
              title="Zoom In (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg hover:bg-[#FAF9FC] text-[#777381] hover:text-[#25212B] transition"
              title="Zoom Out (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <div className="h-4 w-px bg-[#E9E5EF] mx-0.5" />
            <button
              onClick={handleResetZoom}
              className="px-2 py-1 rounded-lg hover:bg-[#FAF9FC] text-[#777381] hover:text-[#25212B] text-[11px] font-bold transition"
              title="Reset Zoom to 100%"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              onClick={handleFitToScreen}
              className="p-1.5 rounded-lg hover:bg-[#FAF9FC] text-[#777381] hover:text-[#25212B] transition"
              title="Fit to Screen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas & Docked Inspector Container */}
      <div className="relative flex flex-col md:flex-row min-h-[520px] max-h-[720px] overflow-hidden bg-[#FAF9FC]/40">
        
        {/* SVG Mind Map Canvas (Desktop & Mobile Canvas mode) */}
        <div 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`flex-1 relative overflow-auto cursor-grab active:cursor-grabbing select-none ${
            mobileViewMode === 'tree' ? 'hidden sm:block' : 'block'
          }`}
          style={{ minHeight: '520px' }}
        >
          <div
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
              transformOrigin: '0 0',
              transition: isDragging ? 'none' : 'transform 0.15s ease-out',
              width: `${treeLayout.canvasWidth}px`,
              height: `${treeLayout.canvasHeight}px`
            }}
            className="relative"
          >
            <svg 
              width={treeLayout.canvasWidth} 
              height={treeLayout.canvasHeight}
              className="absolute inset-0 pointer-events-none"
            >
              <defs>
                <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#56358B" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#16A39A" stopOpacity="0.5" />
                </linearGradient>
                <filter id="shadowGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
                </filter>
              </defs>

              {/* Connecting Spline Curves */}
              {treeLayout.edges.map(edge => {
                const deltaX = (edge.toX - edge.fromX) * 0.55;
                const pathData = `M ${edge.fromX} ${edge.fromY} C ${edge.fromX + deltaX} ${edge.fromY}, ${edge.toX - deltaX} ${edge.toY}, ${edge.toX} ${edge.toY}`;

                return (
                  <path
                    key={edge.id}
                    d={pathData}
                    fill="none"
                    stroke="url(#edgeGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>

            {/* Interactive HTML Node Cards positioned over SVG */}
            {treeLayout.nodes.map(node => {
              const isSelected = selectedNode?.id === node.id || selectedConceptId === node.id;
              const masteryCat = getMasteryCategoryForNode(node.conceptId, node.id);

              return (
                <div
                  key={node.id}
                  onClick={(e) => handleNodeClick(node, e)}
                  style={{
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    transform: 'translate(-50%, -50%)',
                    width: node.type === 'root' ? '200px' : node.type === 'unit' ? '180px' : '190px'
                  }}
                  className={`absolute p-2.5 rounded-2xl cursor-pointer transition-all duration-150 select-none ${
                    node.type === 'root'
                      ? 'bg-gradient-to-br from-[#56358B] to-[#40246a] text-white shadow-md ring-4 ring-[#56358B]/20'
                      : node.type === 'unit'
                        ? 'bg-white border-2 border-[#56358B] text-[#25212B] shadow-xs hover:shadow-md'
                        : isSelected
                          ? 'bg-white border-2 border-[#16A39A] ring-3 ring-[#16A39A]/20 shadow-sm'
                          : 'bg-white border border-[#E9E5EF] text-[#25212B] hover:border-[#16A39A] shadow-2xs'
                  }`}
                >
                  {/* Node Header Row */}
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded-md ${
                      node.type === 'root'
                        ? 'bg-white/20 text-white'
                        : node.type === 'unit'
                          ? 'bg-[#56358B]/10 text-[#56358B]'
                          : 'bg-slate-100 text-slate-700'
                    }`}>
                      {node.type === 'root' ? 'Chapter Root' : node.type === 'unit' ? `Unit ${node.order}` : `Topic`}
                    </span>

                    {/* Mastery indicator dot */}
                    {node.type !== 'root' && (
                      <span 
                        className={`w-2.5 h-2.5 rounded-full ${
                          masteryCat.category === 'strong' ? 'bg-emerald-500' :
                          masteryCat.category === 'developing' ? 'bg-amber-500' :
                          masteryCat.category === 'needs_strengthening' ? 'bg-rose-500' :
                          'bg-slate-300'
                        }`}
                        title={masteryCat.label}
                      />
                    )}
                  </div>

                  {/* Node Title */}
                  <div className="text-xs font-bold line-clamp-2 leading-tight">
                    {node.title}
                  </div>

                  {/* Branch expand/collapse toggle if children exist */}
                  {node.hasChildren && (
                    <div className="mt-1.5 pt-1 border-t border-black/5 flex items-center justify-between text-[10px]">
                      <button
                        onClick={(e) => toggleBranch(node.id, e)}
                        className={`flex items-center gap-1 font-semibold transition px-1.5 py-0.5 rounded ${
                          node.type === 'root' 
                            ? 'text-white/80 hover:text-white hover:bg-white/10' 
                            : 'text-[#56358B] hover:bg-[#56358B]/10'
                        }`}
                      >
                        {node.isCollapsed ? (
                          <>
                            <ChevronRight className="w-3 h-3" />
                            <span>+{node.childCount} branches</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3 h-3" />
                            <span>Collapse</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Responsive Tree View */}
        <div className={`flex-1 p-4 overflow-y-auto space-y-3 sm:hidden ${mobileViewMode === 'tree' ? 'block' : 'hidden'}`}>
          <div className="p-3.5 rounded-2xl bg-linear-to-r from-[#56358B] to-[#40246a] text-white">
            <span className="text-[9px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
              Chapter Root
            </span>
            <h4 className="text-sm font-bold mt-1">{hierarchy?.chapterTitle}</h4>
          </div>

          {treeLayout.nodes.filter(n => n.type !== 'root').map(node => (
            <div
              key={`mob-${node.id}`}
              onClick={(e) => handleNodeClick(node, e)}
              className={`p-3 rounded-2xl border transition ${
                selectedNode?.id === node.id 
                  ? 'bg-white border-[#16A39A] ring-2 ring-[#16A39A]/20' 
                  : 'bg-white border-[#E9E5EF]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-[#56358B] uppercase">
                  {node.type}
                </span>
                <span className="text-[10px] font-bold text-slate-500">
                  {getMasteryCategoryForNode(node.conceptId, node.id).shortLabel || 'Not assessed'}
                </span>
              </div>
              <h5 className="text-xs font-bold text-[#25212B] mt-0.5">{node.title}</h5>
            </div>
          ))}
        </div>

        {/* Docked Node Inspector Drawer (Always accessible upon node selection) */}
        {selectedNode && (
          <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-[#E9E5EF] bg-white p-5 flex flex-col justify-between shadow-xs z-10 shrink-0">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#56358B]/10 text-[#56358B]">
                    {selectedNode.type} Node
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-[#25212B] mt-1.5">
                    {selectedNode.title}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-1 rounded-lg hover:bg-[#FAF9FC] text-[#777381] transition"
                  title="Close Inspector"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Breadcrumb Lineage */}
              <div className="text-[10px] text-[#777381] space-y-1 bg-[#FAF9FC] p-2.5 rounded-xl border border-[#E9E5EF]">
                <div className="font-bold text-[#25212B]">Curricular Hierarchy:</div>
                <div className="flex flex-wrap items-center gap-1 font-medium">
                  {selectedNode.lineage?.map((step, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && <span>›</span>}
                      <span className={idx === selectedNode.lineage.length - 1 ? 'text-[#56358B] font-bold' : ''}>
                        {step}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Description */}
              {selectedNode.description && (
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#777381]">
                    Conceptual Summary:
                  </div>
                  <p className="text-xs text-[#25212B] leading-relaxed">
                    {selectedNode.description}
                  </p>
                </div>
              )}

              {/* Mastery Indicator */}
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#777381]">
                  Mastery Status:
                </div>
                <div>
                  {(() => {
                    const cat = getMasteryCategoryForNode(selectedNode.conceptId, selectedNode.id);
                    return (
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-xl ${cat.badgeClass}`}>
                        {cat.label}
                      </span>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Direct Action Triggers */}
            <div className="pt-4 border-t border-[#E9E5EF] space-y-2 mt-4">
              <button
                onClick={() => {
                  soundService.playClick();
                  if (onSelectConcept) {
                    onSelectConcept({
                      id: selectedNode.conceptId || selectedNode.id,
                      title: selectedNode.title,
                      chapterTitle: hierarchy.chapterTitle,
                      chapterId: hierarchy.chapterId,
                      description: selectedNode.description
                    });
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-[#56358B] hover:bg-[#462b71] text-white font-bold text-xs shadow-xs transition"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Prove Understanding</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    soundService.playClick();
                    if (onOpenNotes) onOpenNotes(selectedNode);
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#FAF9FC] hover:bg-[#E9E5EF] text-[#25212B] font-semibold text-xs border border-[#E9E5EF] transition"
                >
                  <FileText className="w-3.5 h-3.5 text-[#56358B]" />
                  <span>Notes</span>
                </button>
                <button
                  onClick={() => {
                    soundService.playClick();
                    if (onOpenPractice) onOpenPractice(selectedNode);
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#FAF9FC] hover:bg-[#E9E5EF] text-[#25212B] font-semibold text-xs border border-[#E9E5EF] transition"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#16A39A]" />
                  <span>Quiz</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
