import { HighlightedArticle } from "@/components/fancy/highlighted-article";
import React from "react";

function TestPage() {
  return (
    <div>
      <HighlightedArticle color="#4f46e550" glowColor="#818cf8">
        <h1 className=" text-[#4f46e5] font-bold text-2xl mb-4">
          Highlighted Article
        </h1>
        <h5 className=" text-muted-foreground text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
          repudiandae quia illo magni vitae amet animi excepturi ad blanditiis,
          praesentium possimus deserunt odit ducimus quo quidem suscipit aliquid
          quasi ratione accusamus? Impedit, expedita omnis. Quidem deleniti
          facere possimus debitis tempore aspernatur tenetur blanditiis ab
          labore cupiditate quaerat magnam amet quas, ducimus optio. Quasi, odit
          dignissimos rerum praesentium accusantium magni eveniet quae, error,
          voluptate doloremque fugit incidunt voluptatem animi. Culpa a iusto
          laboriosam quia odio in unde excepturi accusantium. Quia ullam error
          sequi sapiente cum, officia architecto dolores tenetur, exercitationem
          quaerat dolorum alias corrupti soluta, fuga veritatis ipsam a voluptas
          rem?
        </h5>
      </HighlightedArticle>
    </div>
  );
}

export default TestPage;
