# -*- coding: utf-8 -*-
"""
Generate high-fidelity UI & Architecture snapshot figures for Chapter 3 (Snapshots)
"""

from PIL import Image, ImageDraw, ImageFont
import os

os.makedirs('docs/images', exist_ok=True)

def create_figure(width, height, title, subtitle, draw_fn, out_path):
    img = Image.new('RGB', (width, height), color='#FFFFFF')
    draw = ImageDraw.Draw(img)
    
    # Outer border & header banner
    draw.rectangle([0, 0, width-1, height-1], outline='#CBD5E1', width=2)
    draw.rectangle([0, 0, width-1, 46], fill='#0F172A')
    
    # Draw title in header
    draw.text((16, 12), title, fill='#FFFFFF')
    draw.text((width - 240, 14), subtitle, fill='#94A3B8')
    
    # Run custom drawing
    draw_fn(draw, width, height)
    
    img.save(out_path, 'PNG')
    print(f'Generated: {out_path}')

# Figure 1: Architecture
def draw_architecture(draw, w, h):
    # Layer 1: Client
    draw.rounded_rectangle([40, 65, w-40, 130], radius=8, fill='#F8FAFC', outline='#3B82F6', width=2)
    draw.text((55, 75), "CLIENT PRESENTATION TIER (React 19 + Vite 8 SPA)", fill='#1E3A8A')
    draw.text((55, 95), "• Web Speech API (Live Audio Streaming)   • Audio Waveform Visualizer   • LocalStorage Draft Persistence", fill='#475569')
    
    # Arrow
    draw.rectangle([w//2 - 2, 130, w//2 + 2, 155], fill='#94A3B8')
    
    # Layer 2: Gateway
    draw.rounded_rectangle([40, 155, w-40, 220], radius=8, fill='#F8FAFC', outline='#10B981', width=2)
    draw.text((55, 165), "APPLICATION GATEWAY & CURRICULUM ROUTER (Node.js Express - Port 3001)", fill='#065F46')
    draw.text((55, 185), "• Curriculum Knowledge Graph (Classes 1-12)   • In-Memory Attempt Caching   • Rate-Limiting & Queue Management", fill='#475569')
    
    # Arrow
    draw.rectangle([w//2 - 2, 220, w//2 + 2, 245], fill='#94A3B8')
    
    # Layer 3: AI Engine
    draw.rounded_rectangle([40, 245, w-40, 310], radius=8, fill='#F8FAFC', outline='#8B5CF6', width=2)
    draw.text((55, 255), "AI CORE REASONING MICROSERVICE (Python FastAPI + Uvicorn - Port 8000)", fill='#5B21B6')
    draw.text((55, 275), "• Semantic Rubric Evaluation Engine   • Misconception Extraction   • Phonetic Lexical Disambiguation", fill='#475569')
    
    # Split arrows
    draw.rectangle([w//4 - 2, 310, w//4 + 2, 335], fill='#94A3B8')
    draw.rectangle([3*w//4 - 2, 310, 3*w//4 + 2, 335], fill='#94A3B8')
    
    # Layer 4: Providers
    draw.rounded_rectangle([40, 335, w//2 - 15, 395], radius=8, fill='#EFF6FF', outline='#2563EB', width=2)
    draw.text((55, 345), "Google Gemini Flash (Free Tier)", fill='#1E40AF')
    draw.text((55, 365), "Cloud Reasoning | Zero API Cost", fill='#64748B')
    
    draw.rounded_rectangle([w//2 + 15, 335, w-40, 395], radius=8, fill='#F0FDF4', outline='#16A34A', width=2)
    draw.text((w//2 + 30, 345), "Local Ollama Engine (Llama-3 / Phi-3)", fill='#166534')
    draw.text((w//2 + 30, 365), "Offline Edge Execution | 100% Private", fill='#64748B')

# Figure 2: Teach-Back Studio
def draw_studio(draw, w, h):
    # Top card: Concept info
    draw.rounded_rectangle([40, 65, w-40, 125], radius=8, fill='#F1F5F9', outline='#CBD5E1', width=1)
    draw.text((55, 75), "NCERT Class 10 Science > Chapter 12: Electricity", fill='#64748B')
    draw.text((55, 95), "Concept: Electric Current & Electric Circuit (c-10-sci-elec-01)", fill='#0F172A')
    
    # Transcript input box
    draw.rounded_rectangle([40, 140, w-40, 230], radius=8, fill='#FFFFFF', outline='#3B82F6', width=2)
    draw.text((55, 150), "\"Electricity is the flow of electric charge through a conductor like copper wire...\"", fill='#1E293B')
    draw.text((55, 205), "Word Count: 14 words  |  Status: Speech-to-Text Active (Web Speech API)", fill='#2563EB')
    
    # Microphone button & controls
    draw.rounded_rectangle([w//2 - 90, 245, w//2 + 90, 285], radius=20, fill='#DC2626')
    draw.text((w//2 - 50, 258), "Stop Mic / Evaluate", fill='#FFFFFF')
    
    # Evaluation result card
    draw.rounded_rectangle([40, 300, w-40, 400], radius=8, fill='#F8FAFC', outline='#10B981', width=2)
    draw.text((55, 312), "EVALUATION DASHBOARD — ACCURACY SCORE: 92/100 (MASTERY ACHIEVED)", fill='#065F46')
    draw.text((55, 332), "✔ What You Got Right: Flow of charge defined; subatomic carriers identified", fill='#166534')
    draw.text((55, 350), "★ Worked Example: I = Q / t  (If 6 Coulombs flow in 2s, Current = 3 Amperes)", fill='#1E293B')
    draw.text((55, 368), "💡 Hindi Explanation: Bijli ka matlab hai electron charges ka wire se behna", fill='#475569')

# Figure 3: Mind Map
def draw_mindmap(draw, w, h):
    draw.rounded_rectangle([40, 65, 220, 115], radius=6, fill='#1E293B')
    draw.text((55, 82), "Class 10 Science", fill='#FFFFFF')
    
    draw.line([220, 90, 270, 90], fill='#94A3B8', width=2)
    draw.line([270, 90, 270, 220], fill='#94A3B8', width=2)
    
    # Chapters
    draw.rounded_rectangle([270, 70, 460, 110], radius=6, fill='#EEF2F6', outline='#64748B', width=1)
    draw.text((285, 82), "Ch 12: Electricity", fill='#0F172A')
    
    draw.rounded_rectangle([270, 130, 460, 170], radius=6, fill='#EEF2F6', outline='#64748B', width=1)
    draw.text((285, 142), "Ch 3: Metals & Non-Metals", fill='#0F172A')
    
    draw.rounded_rectangle([270, 190, 460, 230], radius=6, fill='#EEF2F6', outline='#64748B', width=1)
    draw.text((285, 202), "Ch 6: Life Processes", fill='#0F172A')
    
    # Concepts under Electricity
    draw.line([460, 90, 500, 90], fill='#3B82F6', width=2)
    draw.rounded_rectangle([500, 70, w-40, 110], radius=6, fill='#EFF6FF', outline='#3B82F6', width=2)
    draw.text((515, 82), "• Electric Current & Circuit (I = Q/t)", fill='#1E40AF')
    
    draw.line([460, 90, 500, 130], fill='#3B82F6', width=2)
    draw.rounded_rectangle([500, 120, w-40, 160], radius=6, fill='#EFF6FF', outline='#3B82F6', width=2)
    draw.text((515, 132), "• Electric Potential & Ohm's Law (V = IR)", fill='#1E40AF')
    
    # Prerequisite edge
    draw.line([w-150, 110, w-150, 120], fill='#10B981', width=2)
    draw.text((55, 280), "Graph Dependency Traversal: Topological ordering guarantees prerequisite mastery.", fill='#475569')
    draw.text((55, 310), "Concepts verified against official NCERT NCF-SE 2023 curriculum syllabus.", fill='#64748B')

# Figure 4: Scaffolding
def draw_scaffolding(draw, w, h):
    # Mishearing Card
    draw.rounded_rectangle([40, 65, w-40, 175], radius=8, fill='#FEF3C7', outline='#F59E0B', width=2)
    draw.text((55, 78), "PHONETIC MISHEARING DETECTED & CLEANED", fill='#92400E')
    draw.text((55, 100), "Heard Spoken Audio: \"Atlantic City is the flow of charge\"", fill='#78350F')
    draw.text((55, 120), "Did You Mean: \"Electricity is the flow of charge\"?", fill='#0F172A')
    draw.rounded_rectangle([55, 142, 170, 168], radius=4, fill='#10B981')
    draw.text((65, 149), "✔ Accept & Evaluate", fill='#FFFFFF')
    draw.rounded_rectangle([185, 142, 260, 168], radius=4, fill='#64748B')
    draw.text((200, 149), "Edit Text", fill='#FFFFFF')
    
    # Scaffolding Guidance Card
    draw.rounded_rectangle([40, 195, w-40, 395], radius=8, fill='#F0FDF4', outline='#16A34A', width=2)
    draw.text((55, 208), "SUPPORTIVE GUIDANCE (ZERO PENALTY / NO DEAD-ENDS)", fill='#166534')
    draw.text((55, 230), "Core Concept in Simple Words: Electric current is the rate at which charges move through a conductor.", fill='#14532D')
    draw.text((55, 255), "Sample Sentence You Could Speak:", fill='#0F172A')
    draw.text((70, 275), "• \"Electric current is the flow of electrons through a wire, measured in amperes.\"", fill='#334155')
    draw.text((55, 305), "Guiding Questions to Think About:", fill='#0F172A')
    draw.text((70, 325), "1. What particle actually moves inside the metal wire?", fill='#334155')
    draw.text((70, 345), "2. What unit do we use to measure electric current?", fill='#334155')
    draw.rounded_rectangle([55, 365, 230, 390], radius=4, fill='#2563EB')
    draw.text((65, 372), "Show Me An Example Answer", fill='#FFFFFF')

create_figure(700, 420, "FIGURE 3.1: GYAAN.AI MULTI-TIER SYSTEM ARCHITECTURE", "Decoupled Microservice Topology", draw_architecture, "docs/images/fig1_architecture.png")
create_figure(700, 420, "FIGURE 3.2: TEACH-BACK STUDIO INTERFACE & LIVE EVALUATION", "Active Voice Recitation View", draw_studio, "docs/images/fig2_teachback_studio.png")
create_figure(700, 350, "FIGURE 3.3: NCERT KNOWLEDGE GRAPH & CONCEPT DEPENDENCY TREE", "Curriculum Navigation Hierarchy", draw_mindmap, "docs/images/fig3_mindmap.png")
create_figure(700, 410, "FIGURE 3.4: PHONETIC REPAIR & EMPATHETIC SCAFFOLDING GUIDANCE", "Adaptive Feedback Pipeline", draw_scaffolding, "docs/images/fig4_scaffolding.png")
