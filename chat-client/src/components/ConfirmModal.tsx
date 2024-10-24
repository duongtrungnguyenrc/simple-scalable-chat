import { Modal } from "antd";
import { FC, useState } from "react";

type ConfirmModalProps = {
  title: string;
  content: string;
  open?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
};

const ConfirmModal: FC<ConfirmModalProps> = ({
  title,
  content,
  open,
  onOk,
  onCancel,
}: ConfirmModalProps) => {
  const [openState, setOpenState] = useState<boolean>(false);

  const onOkAction = () => {
    onOk?.();
    setOpenState(true);
  };

  const onCancelAction = () => {
    onCancel?.();
    setOpenState(false);
  };

  return (
    <Modal
      title={title}
      open={open || openState}
      onOk={open ? onOk : onOkAction}
      onCancel={open ? onCancel : onCancelAction}
    >
      <p>{content}</p>
    </Modal>
  );
};

export default ConfirmModal;
