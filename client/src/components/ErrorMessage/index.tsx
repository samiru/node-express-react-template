import "./style.css";

interface ErrorMessageProps {
  message: string;
  requestId?: string;
}

const ErrorMessage = (props: ErrorMessageProps) => {
  const { message, requestId } = props;

  return (
    <>
      <div>{message}</div>
      <div className="request-id">{requestId}</div>
    </>
  );
};

export default ErrorMessage;
