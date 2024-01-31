import styles from "./VerifyEmailPage.module.css";
import { Button, Form } from "react-bootstrap";

const VerifyEmailPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Verify Email</h1>
        <p>
          A verification email has been sent to your email. Please check your
          inbox and enter the code below to activate your account.
        </p>
        <Form>
          <Form.Control type="text" placeholder="Enter verification code" />
          <div className="d-grid mt-3">
            <Button variant="primary" type="submit">
              Verify Email
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
