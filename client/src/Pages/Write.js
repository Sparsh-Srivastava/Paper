import React, { useState } from "react";
import { Grid, Box, Button } from "@material-ui/core";
import Sidebar from "../Components/Sidebar/Sidebar";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { jsPDF } from "jspdf";
import parse from "html-react-parser";

const Write = () => {
  const [editorState, setData] = useState(EditorState.createEmpty());
  const [htmlData, setHtmlData] = useState("");

  const toPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [11.7, 8.3],
    });

    doc.text(parse(htmlData), 1, 1);
    doc.save("textData.pdf");
  };

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={3} lg={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={9} lg={10}>
          <Box className="right_grid_publish">
            <div className="card_chip">WRITE PAPER</div>
            <Editor
              onEditorStateChange={(e) => {
                setData(e);
                setHtmlData(
                  draftToHtml(convertToRaw(editorState.getCurrentContent()))
                );
              }}
            />
            <Button
              variant="outlined"
              className="text_button"
              style={{
                backgroundColor: "#17252a",
                color: "#FEFFFF",
                width: "60%",
              }}
              onClick={toPDF}
            >
              COVERT TO PDF
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Write;