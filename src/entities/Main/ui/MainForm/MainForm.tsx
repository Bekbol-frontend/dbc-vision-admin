import type { FormProps } from "antd";
import { Button, Form, Input, Spin, Typography } from "antd";
import type { ICompanyCreateFormData } from "../../model/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCompany,
  getCompanyDataById,
  updateCompnay,
} from "../../model/services";
import { queryKeys } from "@/shared/queryKeys";
import { useMessageApi } from "@/shared/lib/hooks/useMessageApi";
import styles from "./MainForm.module.css";
import { useEffect } from "react";

interface IProps {
  handleCancel: () => void;
  updateCompanyId: number | null;
}

const { Title } = Typography;

function MainForm({ handleCancel, updateCompanyId }: IProps) {
  const queryClient = useQueryClient();
  const message = useMessageApi();
  const [form] = Form.useForm();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [queryKeys.comanyId, updateCompanyId],
    queryFn: () => getCompanyDataById(updateCompanyId!),
    enabled: !!updateCompanyId,
  });

  const createMutation = useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.comany] });
      message.success("Company created successfully Molodec!");
      form.resetFields();
      handleCancel();
    },
    onError: () => {
      message.error("Something went wrong Molodec!");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateCompnay,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.comany] });
      message.success("Company updated successfully Molodec!");
      form.resetFields();
      handleCancel();
    },
    onError: (error) => {
      message.error(`Something went wrong Molodec! \n ${error.message}`);
    },
  });

  const { isPending: createPending, isError: createError } = createMutation;
  const { isPending: updatePending, isError: updateError } = updateMutation;

  const onFinish: FormProps<ICompanyCreateFormData>["onFinish"] = (values) => {
    if (updateCompanyId) {
      updateMutation.mutate({ id: updateCompanyId, data: values });
      return;
    }

    createMutation.mutate(values);
  };

  useEffect(() => {
    if (data?.data.data) {
      form.setFieldsValue(data.data.data);
    }
  }, [data, form]);

  if (isLoading)
    return (
      <div className={styles.loadingWrapper}>
        <Spin />
      </div>
    );

  if (isError) {
    return (
      <div className={styles.loadingWrapper}>
        <Title level={3} type="danger">
          Error: {error.message}
        </Title>
      </div>
    );
  }
  return (
    <Form
      form={form}
      name={updateCompanyId ? "updateCompany" : "createCompany"}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item<ICompanyCreateFormData>
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<ICompanyCreateFormData>
        label="Address"
        name="address"
        rules={[{ required: true, message: "Please input your address!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<ICompanyCreateFormData>
        label="Phone"
        name="phone"
        rules={[{ required: true, message: "Please input your phone!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<ICompanyCreateFormData>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<ICompanyCreateFormData>
        label="Website"
        name="website"
        rules={[{ required: true, message: "Please input your website!" }]}
      >
        <Input />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        loading={createPending || updatePending}
        danger={createError || updateError}
      >
        {updateCompanyId ? "Update" : "Create"}
      </Button>
    </Form>
  );
}

export default MainForm;
