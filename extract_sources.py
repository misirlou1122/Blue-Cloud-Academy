from __future__ import annotations

import json
import re
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

from pypdf import PdfReader


WORKSPACE = Path(__file__).resolve().parent

SOURCES = [
    Path(r"D:\bruss\IT Stuff D\AZ-900-PowerPoint-01-1.pptx"),
    Path(r"D:\bruss\IT Stuff D\AZ-900-PowerPoint-02-1.pptx"),
    Path(r"D:\bruss\IT Stuff D\AZ-900-PowerPoint-03-1.pptx"),
    Path(r"D:\bruss\IT Stuff D\Azure Study Guide.pdf"),
]


def clean_text(text: str) -> str:
    text = re.sub(r"\s+", " ", text.replace("\x00", " ")).strip()
    return text


def slide_sort_key(name: str) -> int:
    match = re.search(r"slide(\d+)\.xml$", name)
    return int(match.group(1)) if match else 0


def extract_xml_text(xml_bytes: bytes) -> list[str]:
    root = ET.fromstring(xml_bytes)
    texts = []
    for elem in root.iter():
        if elem.tag.endswith("}t") and elem.text:
            value = clean_text(elem.text)
            if value:
                texts.append(value)
    return texts


def extract_pptx(path: Path) -> dict:
    slides = []
    with zipfile.ZipFile(path) as archive:
        slide_names = sorted(
            [name for name in archive.namelist() if re.match(r"ppt/slides/slide\d+\.xml$", name)],
            key=slide_sort_key,
        )
        for index, name in enumerate(slide_names, start=1):
            texts = extract_xml_text(archive.read(name))
            joined = clean_text(" ".join(texts))
            if joined:
                slides.append({"slide": index, "text": joined})
    return {"file": str(path), "type": "pptx", "slide_count": len(slides), "slides": slides}


def extract_pdf(path: Path) -> dict:
    reader = PdfReader(str(path))
    pages = []
    for index, page in enumerate(reader.pages, start=1):
        text = clean_text(page.extract_text() or "")
        if text:
            pages.append({"page": index, "text": text})
    return {"file": str(path), "type": "pdf", "page_count": len(reader.pages), "pages": pages}


def main() -> None:
    results = []
    for source in SOURCES:
        if source.suffix.lower() == ".pptx":
            results.append(extract_pptx(source))
        elif source.suffix.lower() == ".pdf":
            results.append(extract_pdf(source))

    out = WORKSPACE / "azure_source_extract.json"
    out.write_text(json.dumps(results, indent=2), encoding="utf-8")

    summary_lines = []
    for item in results:
        if item["type"] == "pptx":
            summary_lines.append(f"{Path(item['file']).name}: {item['slide_count']} text slides")
        else:
            summary_lines.append(f"{Path(item['file']).name}: {item['page_count']} pages, {len(item['pages'])} text pages")
    (WORKSPACE / "azure_source_summary.txt").write_text("\n".join(summary_lines), encoding="utf-8")
    print("\n".join(summary_lines))


if __name__ == "__main__":
    main()
