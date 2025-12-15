import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { EllipsisVertical } from "lucide-react";

interface PropTypes {
  textButtonDetail: string;
  textButtonDelete?: string;
  textButtonRaport?: string;
  onClickDetail: () => void;
  onClickDelete?: () => void;
  onClickRaport?: () => void;
}

const DropdownAction = (props: PropTypes) => {
  const {
    textButtonDetail,
    textButtonDelete,
    textButtonRaport,
    onClickDetail,
    onClickDelete,
    onClickRaport,
  } = props;
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <EllipsisVertical className="text-default-700" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="detail" onPress={onClickDetail}>
          {textButtonDetail}
        </DropdownItem>

        {textButtonRaport ? (
          <DropdownItem key="raport" onPress={onClickRaport}>
            {textButtonRaport}
          </DropdownItem>
        ) : null}

        {textButtonDelete ? (
          <DropdownItem
            key="delete"
            className="text-red-500"
            onPress={onClickDelete}
          >
            {textButtonDelete}
          </DropdownItem>
        ) : null}
      </DropdownMenu>
    </Dropdown>
  );
};
export default DropdownAction;
