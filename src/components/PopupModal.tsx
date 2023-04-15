import { Modal } from "@mui/material";
import { FlexBox } from "./StyleExtensions.tsx/FlexBox";

export default function PopupModal({ openModal, setOpenModal, children }: any) {
  return (
    <>
      <Modal
        sx={{ ...FlexBox, width: "100%", height: "100%" }}
        open={openModal}
        onClose={() => setOpenModal(!openModal)}
      >
        <>{children}</>
      </Modal>
    </>
  );
}
