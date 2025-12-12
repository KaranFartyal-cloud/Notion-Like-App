import { getPage } from "@/app/actions/pages/getPage";
import { fetchSubject } from "@/app/actions/subject/fetchSubject";
import TextEditor from "@/components/TextEditor";
import "@/styles/styles.scss";
import type { JSONContent } from "@tiptap/core";

const page = async ({ params }: { params: Promise<{ subjectId: string }> }) => {
  const { subjectId } = await params;

  const subject = await fetchSubject(subjectId);
  const data = await getPage(subjectId);
  const raw = data?.data?.content;
  let JsonDoc: JSONContent | string = "";

  if (typeof raw === "string") {
    try {
      JsonDoc = JSON.parse(raw) as JSONContent;
    } catch (e) {
      console.error("Invalid JSON content from DB:", e);
      JsonDoc = ""; 
    }
  } else {
    JsonDoc = "";
  }

  console.log("this is json ", JsonDoc);

  return (
    <div className=" bg-[#191919] w-full h-screen overflow-scroll overflow-x-hidden">
      {/* Image Box */}
      <div className={"w-full h-[200px] overflow-hidden relative" + ``}>
        {subject.data?.banner && (
          <img
            src={"/welcome.jpg"}
            alt=""
            className=" object-cover w-full h-full"
          />
        )}
      </div>

      {/* Welcome Text (OVERFLOWS freely) */}
      <h1 className="text-5xl  text-white font-bold relative -mt-7 ml-6">
        {subject.data?.title}
      </h1>

      {/* Content */}
      <div className="px-[100px] py-10">
        <TextEditor
          id={subject.data?.id}
          userId={subject.data?.userId}
          title={subject.data?.title}
          banner={subject.data?.banner}
          icon={subject.data?.icon}
          JsonDoc={JsonDoc}
        />
      </div>
    </div>
  );
};

export default page;
