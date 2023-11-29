import modulesByChapters from "./modulesByChapters.json";

export type Course = {
  title: string;
  file_server_name: string;
};

export type YearModule = { title: string; courses: Course[] };

export function getChapterModules(chapter_title: string) {
  const chapterModules = modulesByChapters
    ?.find(({ title }) => title == chapter_title)
    ?.modules?.map(({ courses }) => courses)
    ?.flat()
    .map(({ title }) => title);
  return chapterModules;
}
