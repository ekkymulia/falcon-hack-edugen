import DetailBlog from "@/components/organism/DetailBlog/DetailBlog";

export default function BlogDetailTemplate({ article }){
    return (
       <>
            {
                article ? (
                    <DetailBlog articleData={article} />
                ) : (
                    <h1>Article tidak ada</h1>
                )
            }
       </>
    )
}