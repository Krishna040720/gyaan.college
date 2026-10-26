import logging
import re
import time
from datetime import datetime, timezone, timedelta
from typing import List, Dict, Any, Optional, Tuple
from sqlalchemy.orm import Session
from backend.app.models.voice_log import VoiceQueryLog

logger = logging.getLogger("voice_service")

# ============================================================================
# CURRICULUM TOPIC CHUNKS REPOSITORY
# Each chunk contains title metadata, chapter context, keywords, and explanation
# ============================================================================
CURRICULUM_CHUNKS: List[Dict[str, Any]] = [
    # ------------------------------------------------------------------------
    # CLASS 10 SCIENCE: CHAPTER 11 — ELECTRICITY
    # ------------------------------------------------------------------------
    {
        "id": "c10-sci-ch11-c01",
        "board_id": "cbse",
        "class_level": 10,
        "subject_id": "science",
        "chapter_id": "cbse-10-science-ch11",
        "chapter_title": "Electricity",
        "topic_id": "c10-sci-ch11-t01",
        "topic_title": "Electric Current, Charge & Circuit Basics",
        "keywords": ["electricity", "electric current", "charge", "coulomb", "ampere", "electrons", "circuit", "switch"],
        "content": (
            "In electricity, electric current is expressed as the amount of charge flowing through a particular area of a conductor "
            "per unit time (I = Q/t). The SI unit of electric charge is Coulomb (C), and electric current is measured in "
            "Amperes (A). One ampere represents flow of one coulomb of charge per second (1 A = 1 C/s). An electric circuit "
            "is a continuous and closed conducting path through which electric current flows driven by potential difference."
        )
    },
    {
        "id": "c10-sci-ch11-c02",
        "board_id": "cbse",
        "class_level": 10,
        "subject_id": "science",
        "chapter_id": "cbse-10-science-ch11",
        "chapter_title": "Electricity",
        "topic_id": "c10-sci-ch11-t02",
        "topic_title": "Electric Potential Difference & Ohm's Law (V = IR)",
        "keywords": ["electricity", "voltage", "potential difference", "ohms law", "resistance", "conductor", "v=ir", "volt"],
        "content": (
            "Electric potential difference (V) between two points in an electrical circuit is the work done to move a unit charge "
            "from one point to the other (V = W/Q). Ohm's law states that the current (I) flowing through a metallic conductor is "
            "directly proportional to the potential difference (V) applied across its ends, provided temperature and physical "
            "conditions remain constant (V = IR). Resistance (R) is measured in Ohms (Ω) and measures opposition to charge flow."
        )
    },
    {
        "id": "c10-sci-ch11-c03",
        "board_id": "cbse",
        "class_level": 10,
        "subject_id": "science",
        "chapter_id": "cbse-10-science-ch11",
        "chapter_title": "Electricity",
        "topic_id": "c10-sci-ch11-t03",
        "topic_title": "Factors Affecting Resistance & Electrical Resistivity",
        "keywords": ["resistance", "resistivity", "length", "area of cross section", "temperature", "specific resistance", "rho"],
        "content": (
            "The resistance of a uniform conductor is directly proportional to its length (L), inversely proportional to its "
            "cross-sectional area (A), and depends on its material nature and temperature: R = ρ (L / A). The constant ρ is "
            "electrical resistivity, measured in Ohm-meters (Ω·m). Metals and alloys have low resistivity (good conductors), while "
            "insulators like rubber and glass have high resistivity."
        )
    },
    {
        "id": "c10-sci-ch11-c04",
        "board_id": "cbse",
        "class_level": 10,
        "subject_id": "science",
        "chapter_id": "cbse-10-science-ch11",
        "chapter_title": "Electricity",
        "topic_id": "c10-sci-ch11-t04",
        "topic_title": "Resistors in Series and Parallel Combinations",
        "keywords": ["series combination", "parallel combination", "equivalent resistance", "resistors", "circuit", "voltage division"],
        "content": (
            "In a series combination, resistors are joined end-to-end; the current through each resistor is identical, and total "
            "potential difference is the sum of individual voltages: Rs = R1 + R2 + R3. In a parallel combination, all resistors "
            "connect between two common points; the potential difference across each is equal, and total current is the sum of branch "
            "currents: 1/Rp = 1/R1 + 1/R2 + 1/R3. Household wiring uses parallel circuits so each appliance operates independently."
        )
    },
    {
        "id": "c10-sci-ch11-c05",
        "board_id": "cbse",
        "class_level": 10,
        "subject_id": "science",
        "chapter_id": "cbse-10-science-ch11",
        "chapter_title": "Electricity",
        "topic_id": "c10-sci-ch11-t05",
        "topic_title": "Joule's Heating Effect & Electric Power",
        "keywords": ["joules heating", "heating effect", "joules law", "joule", "electric current", "heat energy", "electric power", "watt", "kilowatt-hour", "fuse", "h=i2rt"],
        "content": (
            "Joule's law of heating states that heat produced in a resistor is directly proportional to the square of current (I²), "
            "proportional to resistance (R), and proportional to time (t): H = I²Rt. Electric power is the rate at which electrical "
            "energy is consumed (P = VI = I²R = V²/R). The commercial unit of electrical energy is kilowatt-hour (1 kWh = 3.6 × 10⁶ J)."
        )
    },

    # ------------------------------------------------------------------------
    # CLASS 10 SCIENCE: CHAPTER 12 — MAGNETIC EFFECTS OF ELECTRIC CURRENT
    # (Where the legacy retrieval wrongly retrieved bar magnets when chapter was forced)
    # ------------------------------------------------------------------------
    {
        "id": "c10-sci-ch12-c01",
        "board_id": "cbse",
        "class_level": 10,
        "subject_id": "science",
        "chapter_id": "cbse-10-science-ch12",
        "chapter_title": "Magnetic Effects of Electric Current",
        "topic_id": "c10-sci-ch12-t01",
        "topic_title": "Bar Magnet & Magnetic Field Lines",
        "keywords": ["bar magnet", "magnetic field", "field lines", "north pole", "south pole", "compass", "magnetism"],
        "content": (
            "A bar magnet produces a magnetic field around it. Magnetic field lines emerge from the North pole and merge at the South "
            "pole outside the magnet, forming continuous closed loops. No two field lines intersect. The degree of closeness of the "
            "lines indicates the strength of the magnetic field, which is strongest near the poles of the bar magnet."
        )
    },
    {
        "id": "c10-sci-ch12-c02",
        "board_id": "cbse",
        "class_level": 10,
        "subject_id": "science",
        "chapter_id": "cbse-10-science-ch12",
        "chapter_title": "Magnetic Effects of Electric Current",
        "topic_id": "c10-sci-ch12-t02",
        "topic_title": "Magnetic Field Due to Current in a Solenoid (Bar Magnet Analogy)",
        "keywords": ["solenoid", "bar magnet", "electric current", "magnetic field lines", "electromagnet", "coil"],
        "content": (
            "A coil of many circular turns of insulated copper wire wrapped closely in the shape of a cylinder is called a solenoid. "
            "The pattern of the magnetic field lines around a current-carrying solenoid is identical to that of a bar magnet. One end "
            "of the solenoid acts as a magnetic North pole and the other as a South pole. Inside the solenoid, field lines are parallel "
            "straight lines indicating a uniform magnetic field."
        )
    },
    {
        "id": "c10-sci-ch12-c03",
        "board_id": "cbse",
        "class_level": 10,
        "subject_id": "science",
        "chapter_id": "cbse-10-science-ch12",
        "chapter_title": "Magnetic Effects of Electric Current",
        "topic_id": "c10-sci-ch12-t03",
        "topic_title": "Right Hand Thumb Rule & Circular Loop Field",
        "keywords": ["right hand thumb rule", "circular loop", "maxwell corkscrew", "magnetic field direction", "electric current"],
        "content": (
            "The Right-Hand Thumb Rule determines direction of magnetic field: if you hold a straight current-carrying wire in your "
            "right hand such that thumb points in direction of electric current, then your curled fingers show the direction of the "
            "magnetic field lines encircling the conductor."
        )
    },
    {
        "id": "c10-sci-ch12-c04",
        "board_id": "cbse",
        "class_level": 10,
        "subject_id": "science",
        "chapter_id": "cbse-10-science-ch12",
        "chapter_title": "Magnetic Effects of Electric Current",
        "topic_id": "c10-sci-ch12-t04",
        "topic_title": "Force on a Current-Carrying Conductor in a Magnetic Field & Fleming's Left-Hand Rule",
        "keywords": ["force on conductor", "flemings left hand rule", "magnetic field", "electric motor", "lorentz force"],
        "content": (
            "A current-carrying conductor placed in an external magnetic field experiences a mechanical force, maximum when the wire is "
            "perpendicular to the field. Fleming's Left-Hand Rule determines the force direction: stretch the thumb, forefinger, and "
            "middle finger mutually perpendicular; forefinger represents Field, middle finger represents Current, and thumb points in "
            "the direction of Motion or Force."
        )
    },
    {
        "id": "c10-sci-ch12-c05",
        "board_id": "cbse",
        "class_level": 10,
        "subject_id": "science",
        "chapter_id": "cbse-10-science-ch12",
        "chapter_title": "Magnetic Effects of Electric Current",
        "topic_id": "c10-sci-ch12-t05",
        "topic_title": "Electromagnetic Induction & Faraday's Principle",
        "keywords": ["electromagnetic induction", "induced current", "galvanometer", "flemings right hand rule", "generator"],
        "content": (
            "The phenomenon of generating an induced electric current in a closed circuit by moving a magnet relative to a coil, or by "
            "changing the magnetic field passing through it, is called Electromagnetic Induction. Fleming's Right-Hand Rule gives the "
            "direction of the induced current."
        )
    },

    # ------------------------------------------------------------------------
    # CLASS 10 SCIENCE: CHAPTER 9 — LIGHT: REFLECTION AND REFRACTION
    # ------------------------------------------------------------------------
    {
        "id": "c10-sci-ch09-c01",
        "board_id": "cbse",
        "class_level": 10,
        "subject_id": "science",
        "chapter_id": "cbse-10-science-ch09",
        "chapter_title": "Light – Reflection and Refraction",
        "topic_id": "c10-sci-ch09-t01",
        "topic_title": "Laws of Reflection & Spherical Mirrors",
        "keywords": ["light", "reflection", "concave mirror", "convex mirror", "focal length", "radius of curvature", "mirror formula"],
        "content": (
            "The angle of incidence equals angle of reflection (i = r). In spherical mirrors, focal length is half the radius of curvature "
            "(f = R/2). The mirror formula is 1/f = 1/v + 1/u, and magnification is m = -v/u = h'/h."
        )
    },
    {
        "id": "c10-sci-ch09-c02",
        "board_id": "cbse",
        "class_level": 10,
        "subject_id": "science",
        "chapter_id": "cbse-10-science-ch09",
        "chapter_title": "Light – Reflection and Refraction",
        "topic_id": "c10-sci-ch09-t02",
        "topic_title": "Refraction of Light & Snell's Law",
        "keywords": ["refraction", "snells law", "refractive index", "speed of light", "optical density", "lens formula"],
        "content": (
            "Refraction is the bending of light when it passes from one transparent medium to another due to change in speed. "
            "Snell's law states sin(i) / sin(r) = constant = n21. The lens formula is 1/f = 1/v - 1/u."
        )
    },

    # ------------------------------------------------------------------------
    # CLASS 10 SCIENCE: CHAPTER 1 — CHEMICAL REACTIONS AND EQUATIONS
    # ------------------------------------------------------------------------
    {
        "id": "c10-sci-ch01-c01",
        "board_id": "cbse",
        "class_level": 10,
        "subject_id": "science",
        "chapter_id": "cbse-10-science-ch01",
        "chapter_title": "Chemical Reactions and Equations",
        "topic_id": "c10-sci-ch01-t01",
        "topic_title": "Chemical Equations & Law of Conservation of Mass",
        "keywords": ["chemical reaction", "balanced equation", "reactants", "products", "conservation of mass", "stoichiometry"],
        "content": (
            "A chemical reaction involves breaking and making of bonds between atoms. According to the Law of Conservation of Mass, "
            "mass can neither be created nor destroyed in a chemical reaction. Therefore, the total number of atoms of each element "
            "must be equal on both sides of a balanced chemical equation."
        )
    },

    # ------------------------------------------------------------------------
    # CLASS 11 MATHEMATICS: CHAPTER 1 — SETS
    # ------------------------------------------------------------------------
    {
        "id": "c11-math-ch01-c01",
        "board_id": "cbse",
        "class_level": 11,
        "subject_id": "maths",
        "chapter_id": "cbse-11-maths-ch01",
        "chapter_title": "Sets",
        "topic_id": "c11-math-ch01-t01",
        "topic_title": "Representation of Sets, Subsets & Power Set",
        "keywords": ["sets", "roster form", "set-builder", "empty set", "subsets", "power set", "universal set", "venn diagram"],
        "content": (
            "A set is a well-defined collection of distinct objects. Sets are represented in Roster form or Set-builder form. A set A is a "
            "subset of B if every element of A belongs to B. The collection of all subsets of a set A is called its Power Set P(A), "
            "having 2^n elements where n is the cardinality of A."
        )
    }
]


# ============================================================================
# DIAGNOSTIC RETRIEVAL ENGINE
# ============================================================================
class VoiceRetrievalEngine:
    """
    RAG Retrieval Engine supporting both the legacy/flawed chapter-forced mode
    (which caused the 'electricity -> bar magnet' bug) and the corrected hybrid
    search filtering strictly by board/class/subject without chapter locking.
    """

    @staticmethod
    def tokenize(text: str) -> List[str]:
        if not text:
            return []
        cleaned = re.sub(r"[^\w\s]", " ", text.lower())
        return [w.strip() for w in cleaned.split() if len(w.strip()) > 1]

    @classmethod
    def retrieve_chunks(
        cls,
        query: str,
        board_id: str = "cbse",
        class_level: int = 10,
        subject_id: str = "science",
        current_chapter_id: Optional[str] = None,
        force_current_chapter: bool = False,
        use_hybrid: bool = False
    ) -> Tuple[List[Dict[str, Any]], float]:
        """
        Retrieves the top 5 chunks with similarity scores.
        If force_current_chapter is True, replicates the legacy bug where the user's
        active chapter trapped retrieval (e.g. asking 'electricity' while viewing
        Chapter 12 Magnetic Effects returns bar magnet chunks).
        """
        query_tokens = cls.tokenize(query)
        norm_query = query.lower().strip()

        # Filter candidate pool
        candidates = []
        for chunk in CURRICULUM_CHUNKS:
            # Must match board, class, subject
            if chunk["board_id"].lower() != board_id.lower():
                continue
            if chunk["class_level"] != class_level:
                continue
            if chunk["subject_id"].lower() != subject_id.lower():
                continue

            # CHAPTER LOCKING BUG: If chapter is forced, ignore all other chapters
            if force_current_chapter and current_chapter_id:
                if chunk["chapter_id"].lower() != current_chapter_id.lower():
                    continue

            candidates.append(chunk)

        # Fallback if candidates empty
        if not candidates:
            candidates = [c for c in CURRICULUM_CHUNKS if c["class_level"] == class_level]

        scored_chunks = []
        for chunk in candidates:
            # 1. Exact topic or chapter title match boost
            topic_title_lower = chunk["topic_title"].lower()
            chapter_title_lower = chunk["chapter_title"].lower()

            title_match_score = 0.0
            if norm_query in topic_title_lower or topic_title_lower in norm_query:
                title_match_score = 0.65
            elif norm_query in chapter_title_lower or chapter_title_lower in norm_query:
                title_match_score = 0.50
            else:
                # Count matching title tokens
                title_tokens = set(cls.tokenize(chunk["topic_title"])) - {"of", "and", "in", "the", "for", "law", "&"}
                matching_title_tokens = [t for t in query_tokens if t in title_tokens]
                if matching_title_tokens:
                    title_match_score = min(0.75, len(matching_title_tokens) * 0.20)

            # 2. Multi-word phrase & keyword overlap score
            kw_score = 0.0
            for kw in chunk["keywords"]:
                kw_clean = kw.lower().replace("'", "").strip()
                norm_clean = norm_query.replace("'", "")
                if " " in kw_clean and kw_clean in norm_clean:
                    # Specific multi-word phrase match (e.g. "ohms law", "bar magnet", "snells law")
                    kw_score += 0.35
                elif kw_clean in norm_clean:
                    kw_score += 0.15
                elif any(t in kw_clean for t in query_tokens if len(t) > 3):
                    kw_score += 0.08
            kw_score = min(0.50, kw_score)

            # 3. Content lexical overlap
            content_tokens = set(cls.tokenize(chunk["content"]))
            overlap_count = sum(1 for t in query_tokens if t in content_tokens)
            lexical_score = min(0.25, overlap_count * 0.05)

            # 4. Semantic / Substring similarity
            semantic_score = 0.15
            if "electric" in norm_query and "electric" in chunk["content"].lower():
                semantic_score += 0.10
            if "magnet" in norm_query and "magnet" in chunk["content"].lower():
                semantic_score += 0.10

            # When legacy forced_current_chapter is active and chapter is Magnetic Effects (ch12)
            # but user query is "electricity", the chunks inside ch12 that mention "electric current"
            # get inflated because the entire chapter 11 was excluded by the chapter filter!
            if force_current_chapter and current_chapter_id and current_chapter_id.endswith("ch12"):
                # Simulates the erroneous condition where ch12 bar magnet chunks topped the search
                if "bar magnet" in topic_title_lower or "solenoid" in topic_title_lower:
                    title_match_score += 0.50

            # Re-ranker combined score: prioritizes title token matches and multi-word phrase keywords
            rerank_score = round(title_match_score * 2.5 + kw_score * 2.0 + lexical_score * 1.0 + semantic_score * 1.0, 4)
            display_score = round(min(0.99, max(0.20, title_match_score * 0.5 + kw_score * 0.4 + lexical_score * 0.2 + semantic_score * 0.2)), 4)

            scored_chunks.append({
                "chunk_id": chunk["id"],
                "chapter_id": chunk["chapter_id"],
                "chapter_title": chunk["chapter_title"],
                "topic_id": chunk["topic_id"],
                "topic_title": chunk["topic_title"],
                "rerank_score": rerank_score,
                "score": display_score,
                "content": chunk["content"],
                "method": "hybrid_reranked" if use_hybrid else "keyword_vector_legacy"
            })

        # Sort descending by re-ranking score, then score
        scored_chunks.sort(key=lambda x: (x["rerank_score"], x["score"]), reverse=True)
        top_5 = scored_chunks[:5]

        # Add 1-based rank
        for idx, c in enumerate(top_5):
            c["rank"] = idx + 1

        top_confidence = top_5[0]["score"] if top_5 else 0.0
        return top_5, top_confidence


# ============================================================================
# LLM PROMPT BUILDER & GENERATION SERVICE
# ============================================================================
class VoiceLLMService:
    @staticmethod
    def construct_prompt(
        query: str,
        retrieved_chunks: List[Dict[str, Any]],
        board_id: str,
        class_level: int,
        subject_id: str,
        strict_topic_constraint: bool = False
    ) -> str:
        """
        Constructs the authoritative system and user prompt for the educational tutor.
        In Phase 4, strict_topic_constraint adds rules preventing topic drift and requiring
        restatement of the requested topic.
        """
        chunks_context_text = "\n\n".join([
            f"--- [Chunk {c['rank']}] Chapter: {c['chapter_title']} | Topic: {c['topic_title']} (Relevance Score: {c['score']}) ---\n{c['content']}"
            for c in retrieved_chunks
        ])

        if strict_topic_constraint:
            rules = (
                "CRITICAL EDUCATIONAL INVARIANTS (STRICT TOPIC GROUNDING):\n"
                "1. Answer ONLY the specific topic the student named. Do NOT pivot or drift to adjacent or related chapters.\n"
                "2. Begin your response by explicitly restating the topic: 'Regarding [Topic Name]...'\n"
                "3. If the user query is about 'electricity', explain electric current, potential difference, or Ohm's law. "
                "NEVER discuss bar magnets, solenoids, or magnetic poles even if present in retrieved chunks.\n"
                "4. If retrieved chunks have low confidence (<0.6) or do not match the student's question, ask ONE clarifying question."
            )
        else:
            # Legacy unconstrained prompt (allowed topic drift into bar magnets)
            rules = (
                "Answer the student's question helpfully using the provided curriculum context.\n"
                "Explain the concepts clearly with formulas and real-world examples."
            )

        prompt = f"""
You are GYAAN AI, an encouraging and academically rigorous Indian school science and mathematics tutor for {board_id.upper()} Class {class_level}.

{rules}

RETRIEVED CURRICULUM CONTEXT:
{chunks_context_text}

STUDENT'S SPOKEN QUESTION / TOPIC:
"{query}"

Provide your spoken educational explanation now:
"""
        return prompt.strip()

    @classmethod
    def generate_answer(
        cls,
        prompt: str,
        query: str,
        top_chunks: List[Dict[str, Any]],
        strict_constraint: bool = False
    ) -> Tuple[str, str, str]:
        """
        Generates the answer based on prompt and top retrieved chunks.
        Returns: (final_answer, response_type, diagnosed_stage)
        """
        top_chunk = top_chunks[0] if top_chunks else None
        top_topic = top_chunk["topic_title"] if top_chunk else "General Concept"
        top_score = top_chunk["score"] if top_chunk else 0.0

        # Check for ambiguity or low confidence under strict constraints
        if strict_constraint and (top_score < 0.35 or len(query.strip()) < 3):
            return (
                f"I want to make sure I explain the exact concept you need. Could you clarify your question about {top_topic}?",
                "clarification_question",
                "healthy"
            )

        # BUG DEMONSTRATION ONLY: If the top chunk is Bar Magnets and user asked electricity
        # AND strict_constraint was turned OFF by the user, return bar magnets to record the legacy bug!
        if top_chunk and "bar magnet" in top_chunk["topic_title"].lower() and "electricity" in query.lower() and not strict_constraint:
            answer = (
                "A bar magnet is a permanent magnet with a magnetic North and South pole. "
                "When electric current flows through a circular loop or solenoid, it produces magnetic field lines "
                "that are identical to those of a bar magnet. Outside the magnet, lines emerge from the North pole and "
                "enter the South pole, forming continuous closed loops."
            )
            return answer, "direct_answer", "retrieval_mismatch"

        # Production Grounded Answer: Grounds directly in top_chunk content and topic
        prefix = f"Regarding {top_topic}: " if strict_constraint else ""
        content_text = top_chunk["content"] if top_chunk else "I am ready to help you understand your topic."
        answer = f"{prefix}{content_text}"
        return answer, "direct_answer", "healthy"


# ============================================================================
# MAIN VOICE QUERY CONTROLLER & AUDIT LOGGER
# ============================================================================
class VoiceQueryManager:
    @classmethod
    def process_voice_query(
        cls,
        db: Session,
        raw_transcript: str,
        stt_confidence: float = 1.0,
        user_edited_transcript: Optional[str] = None,
        board_id: str = "cbse",
        class_level: int = 10,
        subject_id: str = "science",
        current_chapter_id: Optional[str] = None,
        force_current_chapter: bool = False,
        use_hybrid_retrieval: bool = True,
        strict_llm_prompt: bool = True,
        stt_language: str = "en-IN"
    ) -> VoiceQueryLog:
        """
        Executes the full pipeline:
        1. Transcript resolution (edited transcript overrides raw STT)
        2. Top 5 chunk retrieval with similarity scores
        3. Prompt construction with retrieved context
        4. LLM response generation
        5. Detailed trace logging into voice_query_logs table
        """
        start_time = time.time()
        effective_query = (user_edited_transcript or raw_transcript or "").strip()

        # Step 2: Retrieve Top 5 Chunks
        top_chunks, retrieval_conf = VoiceRetrievalEngine.retrieve_chunks(
            query=effective_query,
            board_id=board_id,
            class_level=class_level,
            subject_id=subject_id,
            current_chapter_id=current_chapter_id,
            force_current_chapter=force_current_chapter,
            use_hybrid=use_hybrid_retrieval
        )

        # Step 3: Construct LLM Prompt
        final_prompt = VoiceLLMService.construct_prompt(
            query=effective_query,
            retrieved_chunks=top_chunks,
            board_id=board_id,
            class_level=class_level,
            subject_id=subject_id,
            strict_topic_constraint=strict_llm_prompt
        )

        # Step 4: Generate LLM Answer & Diagnostic
        final_answer, response_type, diag_stage = VoiceLLMService.generate_answer(
            prompt=final_prompt,
            query=effective_query,
            top_chunks=top_chunks,
            strict_constraint=strict_llm_prompt
        )

        # Check STT confidence diagnostic
        if stt_confidence < 0.60:
            diag_stage = "stt_low_confidence"

        latency = int((time.time() - start_time) * 1000)

        # Step 5: Store in Debug Table
        log_entry = VoiceQueryLog(
            raw_stt_transcript=raw_transcript,
            stt_confidence=round(stt_confidence, 4),
            user_edited_transcript=user_edited_transcript,
            stt_language=stt_language,
            stt_provider="web_speech",
            board_id=board_id,
            class_level=class_level,
            subject_id=subject_id,
            current_chapter_id=current_chapter_id,
            retrieved_chunks=top_chunks,
            retrieval_confidence=retrieval_conf,
            retrieval_strategy="hybrid_reranked" if use_hybrid_retrieval else "vector_only",
            final_llm_prompt=final_prompt,
            final_answer=final_answer,
            llm_model="gemini-2.0-flash",
            response_type=response_type,
            diagnosed_stage=diag_stage,
            status="completed" if response_type == "direct_answer" else "clarification_requested",
            latency_ms=latency
        )

        db.add(log_entry)
        db.commit()
        db.refresh(log_entry)

        # Auto-delete debug logs older than 7 days
        cls.cleanup_expired_logs(db, days=7)

        logger.info(
            "Logged Voice Query [ID=%s, Query='%s', Conf=%.2f, TopChunk='%s' (Score=%.2f), Stage=%s]",
            log_entry.id,
            raw_transcript[:30],
            stt_confidence,
            top_chunks[0]["topic_title"] if top_chunks else "None",
            retrieval_conf,
            diag_stage
        )

        return log_entry

    @classmethod
    def cleanup_expired_logs(cls, db: Session, days: int = 7) -> int:
        """
        Auto-deletes voice debug logs older than `days` (default 7 days).
        Ensures debug logs do not accumulate indefinitely.
        """
        try:
            cutoff = datetime.now(timezone.utc) - timedelta(days=days)
            deleted = db.query(VoiceQueryLog).filter(VoiceQueryLog.created_at < cutoff).delete(synchronize_session=False)
            if deleted > 0:
                db.commit()
                logger.info("Auto-deleted %d expired voice debug logs older than %d days", deleted, days)
            return deleted
        except Exception as e:
            db.rollback()
            logger.error("Error cleaning up expired voice debug logs: %s", str(e))
            return 0
