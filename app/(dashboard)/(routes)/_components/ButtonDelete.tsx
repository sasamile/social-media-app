"use client";
import { DeletePost } from "@/actions/postcreated";
import { toast } from "@/components/ui/use-toast";
import { Trash } from "lucide-react";
import React from "react";

function ButtonDelete({ Id }: { Id: string }) {
  const handleDelete = async () => {
    try {
      
      await DeletePost(Id);
      toast({
        variant: "success",
        title: "Tweet eliminado",
        description: "El tweet ha sido eliminado con exito",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "al eliminar el tweet",
      });
    }
  };

  return (
    <div className="">
      <button
        onClick={() => handleDelete()}
        className="flex items-center gap-2"
      >
        <Trash className="w-3 h-3" />
        <p className="text-xs">Delete Tweet</p>
      </button>
    </div>
  );
}

export default ButtonDelete;
