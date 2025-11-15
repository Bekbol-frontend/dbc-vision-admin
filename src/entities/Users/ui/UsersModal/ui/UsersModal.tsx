import { Modal } from "antd";
import { UsersForm } from "../../UsersForm";

interface IProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  updateUserId: number | null;
}

function UsersModal(props: IProps) {
  const { isModalOpen, handleCancel, updateUserId } = props;

  return (
    <Modal
      title={updateUserId ? "Update User" : "Create User"}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={false}
      width={700}
    >
      <UsersForm closeModal={handleCancel} updateUserId={updateUserId} />
    </Modal>
  );
}

export default UsersModal;
