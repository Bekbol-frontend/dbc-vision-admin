import {
  createUsersRegister,
  getCompany,
  getFilials,
  getUserByIdRegister,
  updateUsersRegister,
} from "@/entities/Users/model/services";
import type { IUserRegisterCreateData } from "@/entities/Users/model/types";
import { useMessageApi } from "@/shared/lib/hooks/useMessageApi";
import { queryKeys } from "@/shared/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { FormProps } from "antd";
import { Button, Flex, Form, Input, Select, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import styles from "./UsersForm.module.css";

const { Title } = Typography;

interface IProps {
  closeModal: () => void;
  updateUserId: number | null;
}

function UsersForm({ closeModal, updateUserId }: IProps) {
  const [enableCompany, setEnableCompany] = useState(false);
  const [enableFilials, setEnableFilials] = useState(false);
  const [form] = Form.useForm<IUserRegisterCreateData>();

  const queryClient = useQueryClient();
  const message = useMessageApi();

  // Watch Company Id
  const companyId = Form.useWatch("company", form);

  // GET -> Company
  const { data: companyData, isLoading } = useQuery({
    queryKey: [queryKeys.comany],
    queryFn: getCompany,
    enabled: enableCompany || !!updateUserId,
  });

  // GET -> Filials
  const { data: filialsData, isLoading: isLoadingFilials } = useQuery({
    queryKey: [queryKeys.filials, companyId, enableFilials],
    queryFn: () => getFilials(companyId),
    enabled: !!companyId && (enableFilials || !!updateUserId),
  });

  // GET -> UserByIdRegister
  const {
    data: userRegisterData,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
  } = useQuery({
    queryKey: [queryKeys.userRegisterId, updateUserId],
    queryFn: () => getUserByIdRegister(updateUserId!),
    enabled: !!updateUserId,
  });

  // CREATE -> UsersRegister
  const createMutation = useMutation({
    mutationFn: createUsersRegister,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.users] });
      closeModal();
      form.resetFields();
      message.success({
        content: "User created successfully Molodec!",
      });
    },
    onError: () => {
      message.error({
        content: "Error creating user Druslap istese!",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateUsersRegister,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.users] });
      closeModal();
      form.resetFields();
      message.success({
        content: "User updated successfully Molodec!",
      });
    },
    onError: () => {
      message.error({
        content: "Error updating user Druslap istese!",
      });
    },
  });

  // Create -> mutation
  const { isPending: createPending, isError: createError } = createMutation;

  // Update -> mutation
  const { isPending: updatePending, isError: updateError } = updateMutation;

  // Form onFinish
  const onFinish: FormProps<IUserRegisterCreateData>["onFinish"] = (values) => {
    if (updateUserId) {
      updateMutation.mutate({ id: updateUserId, data: values });
      return;
    }
    createMutation.mutate(values);
  };

  useEffect(() => {
    if (userRegisterData?.data.data) {
      const userData = userRegisterData.data.data;

      console.log(userData);

      form.setFieldsValue({
        first_name: userData.first_name,
        last_name: userData.last_name,
        username: userData.username,
        password: userData.password,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
        company: userData.company,
        filials: userData.filials,
      });

      setEnableCompany(true);
      setEnableFilials(true);
    }

    return () => {
      setEnableCompany(false);
      setEnableFilials(false);
      form.resetFields();
    };
  }, [userRegisterData, form]);

  if (isLoadingUser)
    return (
      <div className={styles.loadingWrapper}>
        <Spin />
      </div>
    );

  if (isErrorUser) {
    return (
      <div className={styles.loadingWrapper}>
        <Title level={3} type="danger">
          Error: {errorUser.message}
        </Title>
      </div>
    );
  }

  return (
    <Form
      name={updateUserId ? "updateUser" : "createUser"}
      onFinish={onFinish}
      layout="vertical"
      form={form}
    >
      <Flex gap="10px">
        <Flex flex={1}>
          <Form.Item<IUserRegisterCreateData>
            label="First Name"
            name="first_name"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
            style={{ width: "100%" }}
          >
            <Input />
          </Form.Item>
        </Flex>
        <Flex flex={1}>
          <Form.Item<IUserRegisterCreateData>
            label="Last Name"
            name="last_name"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
            style={{ width: "100%" }}
          >
            <Input />
          </Form.Item>
        </Flex>
      </Flex>

      <Flex gap="10px">
        <Flex flex={1}>
          <Form.Item<IUserRegisterCreateData>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            style={{
              width: "100%",
            }}
          >
            <Input />
          </Form.Item>
        </Flex>
        {!updateUserId && (
          <Flex flex={1}>
            <Form.Item<IUserRegisterCreateData>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              style={{
                width: "100%",
              }}
            >
              <Input />
            </Form.Item>
          </Flex>
        )}
      </Flex>

      <Flex gap="10px">
        <Flex flex={1}>
          <Form.Item<IUserRegisterCreateData>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
            style={{
              width: "100%",
            }}
          >
            <Input />
          </Form.Item>
        </Flex>
        <Flex flex={1}>
          <Form.Item<IUserRegisterCreateData>
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please input your phone!" }]}
            style={{
              width: "100%",
            }}
          >
            <Input />
          </Form.Item>
        </Flex>
      </Flex>

      <Flex gap="10px">
        <Flex flex={1}>
          <Form.Item<IUserRegisterCreateData>
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please input your role!" }]}
            style={{
              width: "100%",
            }}
          >
            <Select
              options={[
                { label: "Admin", value: "admin" },
                { label: "User", value: "user" },
              ]}
            />
          </Form.Item>
        </Flex>
        <Flex flex={1}>
          <Form.Item<IUserRegisterCreateData>
            label="Company"
            name="company"
            rules={[{ required: true, message: "Please input your company!" }]}
            style={{
              width: "100%",
            }}
          >
            <Select
              options={companyData?.data.data.map((el) => ({
                label: el.name,
                value: el.id,
              }))}
              onClick={() => {
                setEnableCompany(true);
              }}
              onChange={() => {
                form.setFieldValue("filials", []);
                setEnableFilials(false);
              }}
              loading={isLoading}
            />
          </Form.Item>
        </Flex>
      </Flex>

      <Form.Item<IUserRegisterCreateData>
        label="Filials"
        name="filials"
        rules={[{ required: true, message: "Please input your filials!" }]}
      >
        <Select
          mode="multiple"
          allowClear
          disabled={!companyId}
          options={filialsData?.data.data.map((el) => ({
            label: el.name,
            value: el.id,
          }))}
          onClick={() => setEnableFilials(true)}
          loading={isLoadingFilials}
        />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        loading={createPending || updatePending}
        danger={createError || updateError}
      >
        {updateUserId ? "Update User" : "Create User"}
      </Button>
    </Form>
  );
}

export default UsersForm;
