'use client';

import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { GripVertical, Eye, EyeOff } from 'lucide-react';
import type { SectionOrder } from '@/types/cv';

interface Props {
  sections: SectionOrder[];
  onChange: (sections: SectionOrder[]) => void;
}

export default function SectionOrderManager({ sections, onChange }: Props) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = [...sections];
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    onChange(reordered);
  };

  const toggleVisible = (id: string) => {
    onChange(sections.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s)));
  };

  return (
    <div className="rounded-xl p-4 mb-4" style={{ background: '#161922', border: '1px solid rgba(255,255,255,0.06)' }}>
      <h3 className="text-xs font-bold mb-4" style={{ color: '#a0a0b0', textTransform: 'uppercase', letterSpacing: '1px' }}>
        Urutan Seksi
      </h3>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-2"
            >
              {sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
                      style={{
                        background: snapshot.isDragging ? 'rgba(220, 38, 38, 0.12)' : 'rgba(255,255,255,0.04)',
                        border: snapshot.isDragging ? '1px solid rgba(220, 38, 38, 0.3)' : '1px solid rgba(255,255,255,0.06)',
                        opacity: section.visible ? 1 : 0.5,
                        ...provided.draggableProps.style,
                      }}
                    >
                      <div {...provided.dragHandleProps} className="drag-handle flex-shrink-0">
                        <GripVertical size={14} color="#606070" />
                      </div>
                      <span className="text-xs font-medium flex-1" style={{ color: section.visible ? '#f8f8f8' : '#606070' }}>
                        {section.label}
                      </span>
                      <button
                        onClick={() => toggleVisible(section.id)}
                        className="p-1 rounded transition-all hover:bg-white/10"
                      >
                        {section.visible
                          ? <Eye size={13} color="#ef4444" />
                          : <EyeOff size={13} color="#606070" />}
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <p className="text-xs mt-3" style={{ color: '#404050' }}>
        Drag untuk mengubah urutan · klik ikon mata untuk sembunyikan
      </p>
    </div>
  );
}
