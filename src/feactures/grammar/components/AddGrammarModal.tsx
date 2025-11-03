import { Modal, Box } from "@mui/material"

interface AddGrammarModalProps {
  open: boolean;
  onClose: () => void;
  topic: string;
  levelEnglish: string;
}

export const AddGrammarModal = ({ open, onClose, topic, levelEnglish }: AddGrammarModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <h1>Add Grammar</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="topic">Topic:</label>
          <input type="text" id="topic" name="topic" />
          <label htmlFor="levelEnglish">Level English:</label>
          <input type="text" id="levelEnglish" name="levelEnglish" />
          <button type="submit">Add</button>
        </form>
      </Box>
    </Modal>
  )
}
