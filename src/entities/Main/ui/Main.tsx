import { Card } from "antd";
import { MainData } from "./MainData";
import MainModal from "./MainModal/MainModal";
import { useCallback, useState } from "react";
import { SectionTop } from "@/shared/ui/SectionTop";

function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateCompanyId, setUpdateCompanyId] = useState<number | null>(null);

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);

    if (updateCompanyId !== null) setUpdateCompanyId(null);
  }, [updateCompanyId]);

  return (
    <>
      <Card>
        <SectionTop title="Manage Company" onShowModal={showModal} />
        <MainData
          setUpdateCompanyId={setUpdateCompanyId}
          showModal={showModal}
        />
      </Card>
      <MainModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        updateCompanyId={updateCompanyId}
      />
    </>
  );
}

export default Main;
