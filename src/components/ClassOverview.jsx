import React from 'react';
import { 
  Play, 
  Clock, 
  Calculator,
  Leaf,
  Atom,
  Compass,
  BookOpen,
  Binary,
  Flame,
  FlaskConical,
  Dna,
  Zap,
  FileText,
  GitBranch
} from 'lucide-react';
import { soundService } from '../services/soundService';
import { progressService } from '../services/progressService';

const ICON_MAP = {
  Calculator,
  Leaf,
  Atom,
  Compass,
  BookOpen,
  Binary,
  Flame,
  FlaskConical,
  Dna,
  Zap
};

export default function ClassOverview({
  gradeData,
  selectedBoard,
  selectedSubject,
  onSelectSubject,
  selectedChapter,
  onSelectChapter,
  onOpenNotes,
  onOpenMindmap
}) {
  const subjects = gradeData.subjects || [];
  const currentSubject = selectedSubject || subjects[0];
  const isUpBoard = selectedBoard?.id === 'up_board';

  const handleChapterClick = (ch, subj) => {
    soundService.playClick();
    if (onOpenNotes) {
      onOpenNotes(ch, subj);
    } else {
      onSelectChapter(ch, subj);
    }
  };

  const handleSubjectClick = (subj) => {
    soundService.playClick();
    onSelectSubject(subj);
  };

  return (
    <div className="space-y-6 text-[#221E2C]">
      
      {/* Clean Subject Selection Bar */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#6C667A]">
            {isUpBoard ? 'विषय चुनें (Subjects):' : 'Select Subject:'}
          </h3>
          <span className="text-xs text-[#6C667A]">
            {gradeData.gradeLabel} • {selectedBoard?.shortName}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {subjects.map((subj) => {
            const IconComp = ICON_MAP[subj.icon] || BookOpen;
            const isSelected = currentSubject?.id === subj.id;

            return (
              <button
                key={subj.id}
                onClick={() => handleSubjectClick(subj)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition border cursor-pointer ${
                  isSelected
                    ? 'bg-[#56358B] text-white border-[#56358B] font-bold shadow-xs'
                    : 'bg-white text-[#221E2C] border-[#E5E0EE] hover:border-[#D2CADF]'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{subj.name}</span>
                <span className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-[#FAF9FC] text-[#6C667A]'
                }`}>
                  {subj.chapters?.length || 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chapters Grid - Clean & Spacious */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-[#221E2C]">
            {isUpBoard ? `${currentSubject?.name} के संपूर्ण अध्याय:` : `All Chapters in ${currentSubject?.name}:`}
          </h4>
          <span className="text-xs text-[#6C667A]">
            {currentSubject?.chapters?.length || 0} {isUpBoard ? 'अध्याय उपलब्ध' : 'Chapters Available'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentSubject?.chapters?.map((ch, idx) => {
            const isCurrent = selectedChapter?.id === ch.id;
            const progress = progressService.getTopicProgress(ch.id);
            const isReviewed = ch.status === 'reviewed';

            return (
              <div
                key={ch.id || idx}
                onClick={() => handleChapterClick(ch, currentSubject)}
                className={`p-4 rounded-xl border transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isCurrent
                    ? 'bg-[#56358B]/5 border-[#56358B] ring-1 ring-[#56358B] shadow-xs'
                    : 'bg-white border-[#E5E0EE] hover:border-[#D2CADF] hover:shadow-xs'
                }`}
              >
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-[#56358B]">
                      {isUpBoard ? `अध्याय ${ch.chapterNumber || idx + 1}` : `Ch ${ch.chapterNumber || idx + 1}`}
                    </span>
                    <span className="text-[#E5E0EE]">•</span>
                    <span className="text-[#6C667A] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {ch.duration || '45 mins'}
                    </span>
                    <span className="text-[#E5E0EE]">•</span>
                    <span className="text-[#14A89A] font-medium text-[11px]">
                      {ch.topicVideos?.length || 3} Topics
                    </span>
                    {isReviewed && (
                      <span className="px-1.5 py-0.2 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
                        Reviewed
                      </span>
                    )}
                    {progress && progress.mastery > 0 && (
                      <span className="px-1.5 py-0.2 rounded bg-[#56358B]/10 text-[#56358B] text-[10px] font-bold">
                        {progress.mastery}% Mastery
                      </span>
                    )}
                  </div>

                  <h5 className="font-semibold text-[#221E2C] text-sm">
                    {ch.title}
                  </h5>
                  {ch.summary && (
                    <p className="text-xs text-[#6C667A] line-clamp-1">
                      {ch.summary}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => {
                      soundService.playClick();
                      if (onOpenNotes) onOpenNotes(ch, currentSubject);
                      else onSelectChapter(ch, currentSubject);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#FAF9FC] hover:bg-[#56358B]/10 text-[#56358B] border border-[#E5E0EE] transition cursor-pointer"
                    title="Open Chapter Notes"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Notes</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundService.playClick();
                      if (onOpenMindmap) onOpenMindmap(ch, currentSubject);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#FAF9FC] hover:bg-[#14A89A]/10 text-[#14A89A] border border-[#E5E0EE] transition cursor-pointer"
                    title="Open Chapter Mind Map"
                  >
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>Mind Map</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundService.playClick();
                      onSelectChapter(ch, currentSubject);
                    }}
                    className={`p-1.5 rounded-lg transition cursor-pointer ${
                      isCurrent ? 'bg-[#56358B] text-white' : 'bg-[#FAF9FC] text-[#6C667A] hover:text-[#56358B] border border-[#E5E0EE]'
                    }`}
                    title="Watch Video Lecture"
                  >
                    <Play className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
