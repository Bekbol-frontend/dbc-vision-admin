import { Card } from "antd";
import UsersData from "./UsersData/UsersData";
import { SectionTop } from "@/shared/ui/SectionTop";
import { UsersModal } from "./UsersModal";
import { useCallback, useState } from "react";

function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateUserId, setUpdateUserId] = useState<number | null>(null);

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);

    if (updateUserId !== null) setUpdateUserId(null);
  }, [updateUserId]);

  return (
    <>
      <Card>
        <SectionTop title="Manage Users" onShowModal={showModal} />
        <UsersData setUpdateUserId={setUpdateUserId} showModal={showModal} />
      </Card>

      <UsersModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        updateUserId={updateUserId}
      />
    </>
  );
}

export default Users;
