import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import type { Word } from "../interfaces/vocabulary.interface";
import { useState } from "react";

export const TableListVocabulary = ({words}: {words: Word[]}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = ( newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflowX: "auto" }}>
      <TableContainer sx={{ width: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="px-6 py-3 text-left">
                <span className="text-gray-500 hover:text-gray-900">Word</span>
              </TableCell>
              <TableCell className="px-6 py-3">
                <span className="text-gray-500 hover:text-gray-900">Definition</span>
              </TableCell>
              <TableCell className="px-6 py-3" colSpan={3}>
                <span className="text-gray-500 hover:text-gray-900">Sentence</span>
              </TableCell>
              <TableCell className="px-6 py-3">
                <span className="text-gray-500 hover:text-gray-900">Level</span>
              </TableCell>
              <TableCell className="px-6 py-3">
                <span className="text-gray-500 hover:text-gray-900">Dias</span>
              </TableCell>
              <TableCell className="px-6 py-3">
                <span className="text-gray-500 hover:text-gray-900">Next Review Date</span>
              </TableCell>
              <TableCell className="px-6 py-3">
                <span className="text-gray-500 hover:text-gray-900">Date Added</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {words
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((word) => {
              return (
              <TableRow key={word.id} className="border-b">
                <TableCell className="px-6 py-4">
                  <span className="text-gray-900">{word.word}</span>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span className="text-gray-900">{word.definition}</span>
                </TableCell>
                <TableCell className="px-6 py-4" colSpan={3}>
                  <ul className="list-disc text-gray-900 pl-4">
                    {word.sentence.map((sentence, index) => (
                      <li key={index} className="mb-2">
                        {sentence}
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span className="text-gray-900">{word.level}</span>
                </TableCell>
                <TableCell className="px-6 py-4">
                  {word.dias.map((dia, index) => (
                    <span key={index} className="text-gray-900 bg-blue-100 rounded px-2 py-1">{dia}</span>
                  ))}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span className="text-gray-900">{word.nextReviewDate}</span>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span className="text-gray-900">{word.dateAdded}</span>
                </TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={words.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => handleChangePage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
