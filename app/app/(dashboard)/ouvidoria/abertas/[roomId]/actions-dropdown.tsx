"use client"

import { AddNoteIcon } from "@/components/icons/AddNoteIcon";
import { CopyDocumentIcon } from "@/components/icons/CopyDocumentIcon";
import { DeleteDocumentIcon } from "@/components/icons/DeleteDocumentIcon";
import { EditDocumentIcon } from "@/components/icons/EditDocumentIcon";
import LoadingDots from "@/components/icons/loading-dots";
import { updateChatRoom } from "@/lib/actions/chatRoom/chatRoom.update.action";
import { cn } from "@/lib/utils";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { ChatRoomStatus } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function ActionsDropDown({id}: {id: string}) {
const [isPending, start] = useTransition();
const router = useRouter();
      const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

     const updateAccept = (status: ChatRoomStatus) => {
       const formData = new FormData();
       formData.append("status", status);
       start(async () => {
         const room = await updateChatRoom(formData, id, "status");
         if ("error" in room) {
           toast.error(room.error);
         } else {
           router.push('/ouvidoria/abertas')
         }
       });
     };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          variant="faded"
          aria-label="Take a photo"
          spinner={<LoadingDots color="#808080" />}
          isLoading={isPending}
        >
          {isPending ? "" : <MoreHorizontal />}
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
        <DropdownSection title="Actions" showDivider>
          <DropdownItem
            key="new"
            shortcut="⌘N"
            description="Create a new file"
            startContent={<AddNoteIcon className={iconClasses} />}
          >
            New file
          </DropdownItem>
          <DropdownItem
            key="copy"
            shortcut="⌘C"
            description="Copy the file link"
            startContent={<CopyDocumentIcon className={iconClasses} />}
          >
            Copy link
          </DropdownItem>
          <DropdownItem
            key="edit"
            shortcut="⌘⇧E"
            description="Allows you to edit the file"
            startContent={<EditDocumentIcon className={iconClasses} />}
          >
            Edit file
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Danger zone">
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            shortcut="⌘⇧D"
            onPress={() => updateAccept('disabled')}
            description="Permanently delete the file"
            startContent={
              <DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />
            }
          >
            Delete file
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
