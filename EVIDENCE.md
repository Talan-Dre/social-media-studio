## CONTENT GENERATION
- [x] Platform image variants generated correctly: dimensions, aspect ratio, safe zone asserted via tests.
- [x] Captions are platform-aware and composed from shared + platform-specific fragments.

### Proof Execution:
```text
PASS tests/variantPipeline.test.ts
  Phase 2 Pipeline Verification
    generates correct platform image dimensions (1080x1080, 1600x900)
    composes distinct platform-aware captions