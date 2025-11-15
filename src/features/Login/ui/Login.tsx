import type { FormProps } from 'antd';
import { Button, Form, Input, Card } from 'antd';
import styles from "./Login.module.css"
import type { ILoginFormData } from '../model/types';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { fetchLogin } from '../model/services';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { useMessageApi } from '@/shared/lib/hooks/useMessageApi';


function Login() {
  const message = useMessageApi()
  const dispatch = useAppDispatch()
  const { loading, error, } = useAppSelector(state => state.login)

  const onFinish: FormProps<ILoginFormData>['onFinish'] = async (values) => {
    const res = await dispatch(fetchLogin(values))

    if (res.meta.requestStatus === "fulfilled") {
      message.success({
        content: "Ok molodec!"
      })
    }

    if (res.meta.requestStatus === "rejected") {
      message.error({
        content: "Druslap ot!"
      })
    }
  };


  return (
    <Card className={styles.login}>
      <Form
        name="login"
        onFinish={onFinish}
        autoComplete="off"
        layout='vertical'
      >
        <Form.Item<ILoginFormData>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<ILoginFormData>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>



        <Button type="primary" htmlType="submit" loading={loading} danger={!!error}>
          Login
        </Button>
      </Form>

    </Card>
  )
}

export default Login