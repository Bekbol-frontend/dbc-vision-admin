import { deleteCompnay, getCompanyData } from "@/entities/Main/model/services";
import type { ICompanyData } from "@/entities/Main/model/types";
import { useMessageApi } from "@/shared/lib/hooks/useMessageApi";
import { queryKeys } from "@/shared/queryKeys";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Popconfirm, Table } from "antd";
import type { TableProps } from "antd";
import { createStyles } from "antd-style";
import { useState } from "react";

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token as any;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

interface IProps {
  setUpdateCompanyId: React.Dispatch<React.SetStateAction<number | null>>;
  showModal: () => void;
}

function MainData({ setUpdateCompanyId, showModal }: IProps) {
  const [id, setId] = useState<null | number>(null);
  const { styles } = useStyle();
  const message = useMessageApi();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteCompnay,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.comany] });
      message.success("Company deleted successfully Molodec!");
      setId(null);
    },
    onError: (error) => {
      message.error(
        `Something went wrong qate boldi Molodec! \n ${error.message}`
      );
    },
  });

  const { isPending } = deleteMutation;

  const confirm = (id: number) => {
    setId(id);
    deleteMutation.mutate(id);
  };

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.comany],
    queryFn: getCompanyData,
  });

  const columns: TableProps<ICompanyData>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Flex gap="4px">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              showModal();
              setUpdateCompanyId(record.id);
            }}
          />
          <Popconfirm
            title="Are you sure to delete this task?"
            description="Some descriptions"
            onConfirm={() => confirm(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              loading={id === record.id && isPending}
            />
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  return (
    <Table<ICompanyData>
      columns={columns}
      dataSource={data?.data.data}
      loading={isLoading}
      rowKey="id"
      pagination={false}
      className={styles.customTable}
      scroll={{ x: "max-content" }}
    />
  );
}

export default MainData;
