import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUsersRegister, getUsers } from "../../model/services";

import { Button, Popconfirm, Table } from "antd";
import { Flex, type TableProps } from "antd";
import type { IUserRegisterData } from "../../model/types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";
import { queryKeys } from "@/shared/queryKeys";
import { useMessageApi } from "@/shared/lib/hooks/useMessageApi";
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
  setUpdateUserId: React.Dispatch<React.SetStateAction<number | null>>;
  showModal: () => void;
}

function UsersData({ setUpdateUserId, showModal }: IProps) {
  const [id, setId] = useState<null | number>(null);
  const { styles } = useStyle();

  const queryClient = useQueryClient();
  const message = useMessageApi();

  // DELETE -> Request
  const deleteMutation = useMutation({
    mutationFn: deleteUsersRegister,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.users] });
      message.success({ content: "User deleted successfully Molodec!" });
      setId(null);
    },
    onError: () => {
      message.error({ content: "Error deleting user Druslap istese!" });
    },
  });

  const { isPending } = deleteMutation;

  const confirm = (id: number) => {
    setId(id);
    deleteMutation.mutate(id);
  };

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.users],
    queryFn: getUsers,
  });

  const columns: TableProps<IUserRegisterData>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      width: 70,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Company",
      key: "user_company",
      render: (_, { user_company }) => user_company?.name,
    },
    {
      title: "FTP Username",
      key: "ftp_username",
      render: (_, { user_company }) => user_company?.ftp_username,
    },
    {
      title: "FTP Password",
      key: "ftp_password",
      render: (_, { user_company }) => user_company?.ftp_password,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Flex gap={4}>
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() => {
              setUpdateUserId(record.id);
              showModal();
            }}
          />

          <Popconfirm
            title="Delete user"
            description="Are you sure to delete this user?"
            onConfirm={() => confirm(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              type="primary"
              danger
              loading={id === record.id && isPending}
            />
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  return (
    <Table<IUserRegisterData>
      columns={columns}
      loading={isLoading}
      dataSource={data?.data.data}
      rowKey="id"
      pagination={false}
      className={styles.customTable}
      scroll={{ x: "max-content" }}
    />
  );
}

export default UsersData;
