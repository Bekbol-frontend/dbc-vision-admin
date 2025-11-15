import { Modal } from "antd";
import MainForm from "../MainForm/MainForm";

interface IProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  updateCompanyId: number | null;
}

function MainModal({ isModalOpen, handleCancel, updateCompanyId }: IProps) {
  return (
    <Modal
      title={updateCompanyId ? "Update Company" : "Create Company"}
      closable={{ "aria-label": "Custom Close Button" }}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={false}
    >
      <MainForm handleCancel={handleCancel} updateCompanyId={updateCompanyId} />
    </Modal>
  );
}

export default MainModal;
