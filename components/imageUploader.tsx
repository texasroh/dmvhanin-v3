import { PhotoIcon } from "@heroicons/react/20/solid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { DragEvent, HTMLAttributes, memo, useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import NoSsr from "./noSsr";

interface ImageItem {
  id?: number;
  sort: number;
  url?: string;
  file?: File;
}

interface ImagePreviewProps {
  file: ImageItem;
}

const ImagePreview = memo(({ file }: ImagePreviewProps) => {
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (file.file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const newImageUrl = URL.createObjectURL(file.file!);
        setPreview(newImageUrl);
      };
      reader.readAsDataURL(file.file);
      return () => {
        reader.abort();
        if (preview) {
          URL.revokeObjectURL(preview);
        }
      };
    } else if (file.url) {
      setPreview(file.url);
    }
  }, [file]);

  return (
    <img
      className="h-24 w-24 rounded object-contain shadow shadow-gray-300"
      src={preview}
    />
  );
});

interface ImageUploaderProps extends HTMLAttributes<HTMLInputElement> {
  onFileChange?: (files: File[]) => void;
}

const ImageUploader = ({ onFileChange }: ImageUploaderProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(true);
    };
  }, []);

  const [files, setFiles] = useState<ImageItem[]>([]);
  const onChangeFile = (newfiles: FileList) => {
    if (!newfiles) return;
    if (files.length >= 5) return;
    const fileArray = Array.from(newfiles);
    const newFileArray = fileArray.map((file) => ({
      id: files.length + 1,
      sort: 1,
      file,
    }));
    setFiles((prev) => [...prev, ...newFileArray]);
  };

  useEffect(() => {
    // onFileChange?.(files);
  }, [files]);

  const onDragEnd = (result: DropResult) => {
    console.log("result.source.droppableId", result.source.droppableId);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onChangeFile(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };
  console.log(files);

  if (!enabled) return null;

  return (
    <NoSsr>
      <div
        onDrop={(e) => onDrop(e)}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={console.log}
        onDragLeave={console.log}
        className="rounded border border-dotted border-gray-400 p-4 text-gray-400"
      >
        <input
          id="imageInput"
          className="hidden"
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.currentTarget.files && onChangeFile(e.currentTarget.files)
          }
          multiple
        />
        {files.length > 0 ? (
          <DragDropContext onDragEnd={console.log}>
            <Droppable droppableId="images">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-wrap gap-3"
                >
                  {files.map((file, idx) => (
                    <Draggable
                      draggableId={file.id + ""}
                      index={idx}
                      key={file.id}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <ImagePreview file={file} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {/* {provided.placeholder} */}
                  {files.length < 5 && (
                    <label
                      className="flex h-24 w-24 cursor-pointer items-center justify-center rounded object-contain shadow shadow-gray-300"
                      htmlFor="imageInput"
                    >
                      <PlusCircleIcon className="h-7 w-7" />
                    </label>
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <div className="flex min-h-[150px] items-center justify-center">
            <div>
              <PhotoIcon className="mx-auto h-10 w-10" />
              <div className="flex gap-1">
                <div className="mx-auto">Drag Images or</div>
                <div className="flex justify-center">
                  <label
                    className="cursor-pointer text-sky-400 underline"
                    htmlFor="imageInput"
                  >
                    Browse file
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </NoSsr>
  );
};

export default ImageUploader;
