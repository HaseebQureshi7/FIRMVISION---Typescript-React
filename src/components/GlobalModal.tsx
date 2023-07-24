import {
  Clear,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Modal,
  Typography,
} from "@mui/material";
import { FlexBox } from "./StyleExtensions.tsx/FlexBox";
import isXSmall from "./isXSmall";

export default function GlobalModal({
  openModal = false,
  setOpenModal,
  headerText,
  children,
}: any) {
  const { isXS } = isXSmall();
  return (
    <>
      <Modal
        sx={{ ...FlexBox, width: "100%", height: "100%" }}
        open={openModal}
        onClose={() => setOpenModal(!openModal)}
      >
        <Box
          sx={{
            ...FlexBox,
            p: { xs: 1, lg: 2.5 },
            height: "auto",
            width: { xs: "100%", lg: "75%" },
            borderRadius: "5px",
            gap: 1,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            backgroundColor: "background.default",
          }}
        >
          {/* MODAL HEADER */}
          <Box
            sx={{
              ...FlexBox,
              flexDirection: "row",
              justifyContent: "space-between",
              p: 1,
              pr: { xs: 1, lg: 2.5 },
            }}
          >
            <Typography
              color="text.primary"
              fontWeight={500}
              variant={isXS ? "h5" : "h4"}
            >
              {headerText}
            </Typography>
            <Clear
              sx={{ cursor: "pointer", color: "text.primary" }}
              onClick={() => setOpenModal(!openModal)}
              fontSize={"large"}
            />
          </Box>
          <Divider sx={{ width: "100%" }} />
          {/* MODAL BODY */}
          <>{children}</>
        </Box>
      </Modal>
    </>
  );
}
