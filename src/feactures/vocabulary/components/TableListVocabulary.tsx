import {
  Box,
  Chip,
  Collapse,
  IconButton,
  Stack,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import type { Word } from "../interfaces/vocabulary.interface";
import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { vocabStyles } from "../styles/style";
import dayjs from "dayjs";

export const TableListVocabulary = ({ words }: { words: Word[] }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return words;
    const q = search.toLowerCase();
    return words.filter(
      (w) =>
        w.word.toLowerCase().includes(q) ||
        w.definition.toLowerCase().includes(q)
    );
  }, [words, search]);

  const paged = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderLevelDots = (level: number, max = 6) => (
    <Stack direction="row" spacing={0.5} alignItems="center">
      {Array.from({ length: max }).map((_, i) => (
        <Box key={i} sx={vocabStyles.levelDot(i < level)} />
      ))}
      <Typography sx={{ ...vocabStyles.wordMeta, ml: 0.5 }}>
        {level}/{max}
      </Typography>
    </Stack>
  );

  return (
    <Box>
      {/* Section title + search */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Typography sx={vocabStyles.sectionTitle}>
          Your Words
        </Typography>
        <TextField
          placeholder="Search words..."
          size="small"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          sx={{ ...vocabStyles.searchField, maxWidth: { sm: 280 } }}
          slotProps={{
            input: {
              startAdornment: (
                <Search size={16} style={{ marginRight: 8, color: "#9252e0" }} />
              ),
            },
          }}
        />
      </Stack>

      {/* Cards list */}
      <Stack spacing={1.5}>
        {paged.map((word) => {
          const id = word.id || word.word;
          const isExpanded = expandedId === id;

          return (
            <Box key={id} sx={vocabStyles.wordCard}>
              <Box sx={vocabStyles.wordCardContent}>
                {/* Main row */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      flexWrap="wrap"
                      useFlexGap
                    >
                      <Typography sx={vocabStyles.wordTitle}>
                        {word.word}
                      </Typography>
                      {word.type && (
                        <Chip
                          label={word.type}
                          size="small"
                          sx={vocabStyles.chipType}
                        />
                      )}
                    </Stack>
                    <Typography sx={vocabStyles.wordDefinition}>
                      {word.definition}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{ mt: 1 }}
                    >
                      {renderLevelDots(word.level)}
                      <Typography sx={vocabStyles.wordMeta}>
                        Next:{" "}
                        {dayjs(word.nextReviewDate).format("MMM D, YYYY")}
                      </Typography>
                    </Stack>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={() => toggleExpand(id)}
                    sx={{ color: "#9252e0" }}
                  >
                    {isExpanded ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </IconButton>
                </Stack>

                {/* Expandable detail */}
                <Collapse in={isExpanded}>
                  <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid #f0ecf8" }}>
                    {/* Sentences */}
                    {word.sentence.length > 0 && (
                      <Box sx={{ mb: 1.5 }}>
                        <Typography
                          sx={{
                            ...vocabStyles.chipLabel,
                            fontSize: "0.8rem",
                            mb: 1,
                          }}
                        >
                          Sentences
                        </Typography>
                        {word.sentence.map((s, i) => (
                          <Typography key={i} sx={vocabStyles.sentenceItem}>
                            {s}
                          </Typography>
                        ))}
                      </Box>
                    )}

                    {/* Synonyms / Antonyms */}
                    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                      {Array.isArray(word.synonyms) && word.synonyms.length > 0 && (
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={0.5}
                        >
                          <Typography sx={vocabStyles.chipLabel}>
                            Synonyms:
                          </Typography>
                          {word.synonyms.map((s) => (
                            <Chip
                              key={s}
                              label={s}
                              size="small"
                              sx={vocabStyles.chipSynonym}
                            />
                          ))}
                        </Stack>
                      )}
                      {Array.isArray(word.antonyms) && word.antonyms.length > 0 && (
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={0.5}
                        >
                          <Typography sx={vocabStyles.chipLabel}>
                            Antonyms:
                          </Typography>
                          {word.antonyms.map((a) => (
                            <Chip
                              key={a}
                              label={a}
                              size="small"
                              sx={vocabStyles.chipAntonym}
                            />
                          ))}
                        </Stack>
                      )}
                    </Stack>

                    {/* Date info */}
                    <Stack direction="row" spacing={2} sx={{ mt: 1.5 }}>
                      <Typography sx={vocabStyles.wordMeta}>
                        Added: {dayjs(word.dateAdded).format("MMM D, YYYY")}
                      </Typography>
                      <Typography sx={vocabStyles.wordMeta}>
                        Intervals: {word.dias.join(", ")}d
                      </Typography>
                    </Stack>
                  </Box>
                </Collapse>
              </Box>
            </Box>
          );
        })}

        {paged.length === 0 && (
          <Box sx={{ ...vocabStyles.formCard, textAlign: "center", py: 5 }}>
            <Typography sx={vocabStyles.wordMeta}>
              {search ? "No words match your search" : "No words yet — add your first word above!"}
            </Typography>
          </Box>
        )}
      </Stack>

      {/* Pagination */}
      {filtered.length > rowsPerPage && (
        <Box
          sx={{
            mt: 2,
            bgcolor: "#ffffff",
            borderRadius: "0.75rem",
            boxShadow:
              "0 1px 3px rgba(47,15,87,0.06), 0 4px 16px rgba(47,15,87,0.04)",
          }}
        >
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={filtered.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(+e.target.value);
              setPage(0);
            }}
          />
        </Box>
      )}
    </Box>
  );
};
