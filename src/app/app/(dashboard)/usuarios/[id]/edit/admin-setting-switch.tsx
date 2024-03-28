import { cn, Switch } from "@nextui-org/react";

export default function AdminSettingSwitch({name, children}: {name: string; children: string}) {
    return (
      <Switch
        classNames={{
          base: cn(
            "inline-flex flex-row-reverse w-full max-w-full bg-content1 hover:bg-content2 items-center",
            "justify-between cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
            "data-[selected=true]:border-primary",
          ),
          wrapper: "p-0 h-4 overflow-visible",
          thumb: cn(
            "w-6 h-6 border-2 shadow-lg",
            "group-data-[hover=true]:border-primary",
            "group-data-[selected=true]:ml-6",
            // pressed
            "group-data-[pressed=true]:w-7",
            "group-data-[selected]:group-data-[pressed]:ml-4",
          ),
        }}
        name={name}
      >
        <div className="flex flex-col gap-1">
          <p className="text-medium">{children}</p>
        </div>
      </Switch>
    );
}