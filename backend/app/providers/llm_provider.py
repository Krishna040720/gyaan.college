"""
LLM Provider implementations:
1. GeminiFreeProvider (Google GenAI Free Tier)
2. OllamaLocalProvider (Local Ollama daemon, offline, 100% free)
"""
import os
import json
import urllib.request
import urllib.error
from typing import Dict, Any, Optional
from backend.app.providers.base import BaseLLMProvider


class GeminiFreeProvider(BaseLLMProvider):
    def __init__(self, api_key: Optional[str] = None, model: Optional[str] = None):
        super().__init__(
            name="gemini_free",
            model=model or os.getenv("GEMINI_MODEL", "gemini-2.0-flash")
        )
        self.api_key = api_key or os.getenv("GEMINI_API_KEY", "")
        self.base_url = "https://generativelanguage.googleapis.com/v1beta"

    def health_check(self) -> Dict[str, Any]:
        return {
            "healthy": bool(self.api_key and self.api_key.strip()),
            "provider": self.name,
            "model": self.model,
            "details": "Ready" if self.api_key else "GEMINI_API_KEY not configured"
        }

    def generate_text(self, prompt: str, system_prompt: Optional[str] = None, temperature: float = 0.7) -> str:
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY is not configured")

        url = f"{self.base_url}/models/{self.model}:generateContent?key={self.api_key}"
        contents = []
        if system_prompt:
            contents.append({"role": "user", "parts": [{"text": f"[System]: {system_prompt}"}]})
            contents.append({"role": "model", "parts": [{"text": "Understood."}]})
        contents.append({"role": "user", "parts": [{"text": prompt}]})

        payload = {
            "contents": contents,
            "generationConfig": {"temperature": temperature}
        }

        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=15) as response:
            data = json.loads(response.read().decode("utf-8"))
            return data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")

    def generate_json(self, prompt: str, system_prompt: Optional[str] = None, temperature: float = 0.3) -> Dict[str, Any]:
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY is not configured")

        url = f"{self.base_url}/models/{self.model}:generateContent?key={self.api_key}"
        contents = []
        if system_prompt:
            contents.append({"role": "user", "parts": [{"text": f"[System]: {system_prompt}"}]})
            contents.append({"role": "model", "parts": [{"text": "Understood. I will return strictly valid JSON."}]})
        contents.append({"role": "user", "parts": [{"text": prompt}]})

        payload = {
            "contents": contents,
            "generationConfig": {
                "temperature": temperature,
                "responseMimeType": "application/json"
            }
        }

        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=15) as response:
            data = json.loads(response.read().decode("utf-8"))
            raw_text = data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "{}")
            clean_text = raw_text.strip().replace("```json", "").replace("```", "").strip()
            return json.loads(clean_text)


class OllamaLocalProvider(BaseLLMProvider):
    def __init__(self, base_url: Optional[str] = None, model: Optional[str] = None):
        super().__init__(
            name="ollama_local",
            model=model or os.getenv("OLLAMA_MODEL", "llama3.2:1b")
        )
        self.base_url = (base_url or os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")).rstrip("/")

    def health_check(self) -> Dict[str, Any]:
        try:
            req = urllib.request.Request(f"{self.base_url}/api/tags")
            with urllib.request.urlopen(req, timeout=3) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                models = [m.get("name") for m in data.get("models", [])]
                return {
                    "healthy": True,
                    "provider": self.name,
                    "model": self.model,
                    "models_available": models
                }
        except Exception as e:
            return {
                "healthy": False,
                "provider": self.name,
                "model": self.model,
                "details": f"Ollama unreachable: {str(e)}"
            }

    def generate_text(self, prompt: str, system_prompt: Optional[str] = None, temperature: float = 0.7) -> str:
        url = f"{self.base_url}/api/generate"
        payload = {
            "model": self.model,
            "prompt": prompt,
            "system": system_prompt,
            "stream": False,
            "options": {"temperature": temperature}
        }
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=45) as response:
            data = json.loads(response.read().decode("utf-8"))
            return data.get("response", "")

    def generate_json(self, prompt: str, system_prompt: Optional[str] = None, temperature: float = 0.3) -> Dict[str, Any]:
        url = f"{self.base_url}/api/generate"
        payload = {
            "model": self.model,
            "prompt": prompt + "\n\nOutput strictly valid JSON only.",
            "system": (system_prompt or "") + "\nOutput strictly valid JSON.",
            "format": "json",
            "stream": False,
            "options": {"temperature": temperature}
        }
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=45) as response:
            data = json.loads(response.read().decode("utf-8"))
            raw = data.get("response", "{}")
            clean = raw.strip().replace("```json", "").replace("```", "").strip()
            return json.loads(clean)
