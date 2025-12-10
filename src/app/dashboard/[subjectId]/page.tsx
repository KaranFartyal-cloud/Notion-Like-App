import { fetchSubject } from "@/app/actions/subject/fetchSubject";
import TextEditor from "@/components/TextEditor";
import "@/styles/styles.scss";

const page = async ({ params }: { params: Promise<{ subjectId: string }> }) => {
  const { subjectId } = await params;

  const subject = await fetchSubject(subjectId);

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
        />
      </div>
    </div>
  );
};

export default page;
