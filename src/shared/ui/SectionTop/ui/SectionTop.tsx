import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Typography } from "antd";

const { Title } = Typography;

interface IProps {
  title: string;
  onShowModal: () => void;
}

function SectionTop({ title, onShowModal }: IProps) {
  return (
    <Flex
      align="center"
      justify="space-between"
      style={{
        marginBottom: 30,
      }}
    >
      <Title
        level={4}
        style={{
          marginBottom: 0,
        }}
      >
        {title}
      </Title>
      <Button icon={<PlusOutlined />} type="primary" onClick={onShowModal} />
    </Flex>
  );
}

export default SectionTop;
