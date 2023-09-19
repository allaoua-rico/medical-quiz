import { getVariableName } from "./utils/functions";

export type Course = {
  title: string;
};

export type YearModule = { title: string; courses: Course[] };

const annee1: YearModule[] = [
  {
    title: "Anatomie",
    courses: [
      { title: "Introduction & ostéologie du membre supérieur" },
      { title: "Arthrologie du membre supérieur" },
      { title: "Myologie du membre supérieur" },
      { title: "Angiologie du membre supérieur" },
      { title: "Innervation du membre supérieur" },
      { title: "Ostéologie du membre inférieur" },
      { title: "Arthrologie du membre inférieure" },
      { title: "Myologie du membre inférieure" },
      { title: "Angiologie du membre inférieure" },
      { title: "Innervation du membre inférieure" },
    ],
  },
  {
    title: "Cytologie",
    courses: [
      { title: "Organisation générale de la cellule" },
      { title: "Méthode d’étude" },
      { title: "Membrane plasmique" },
      { title: "Communication intercellulaire" },
      { title: "Hyaloplasme" },
      { title: "Cytosquelette" },
      { title: "Systèmes endomembranaires" },
      { title: "Noyau interphasique" },
      { title: "La mitochondrie & peroxysomes" },
    ],
  },
  {
    title: "Embryologie",
    courses: [
      { title: "Introduction à l’embryologie" },
      { title: "Cycle cellulaire" },
      { title: "Spermatogenèse" },
      { title: "Spermatozoïde, structure et biologie" },
      { title: "Ovogenèse" },
      { title: "Ovulation" },
      { title: "1ère semaine de" },
      { title: "2ème semaine de" },
      { title: "3ème semaine de" },
      { title: "4ème semaine de" },
      { title: "Annexes embryonnaires" },
      { title: "Appareil branchial" },
      { title: "Les cellules souches" },
    ],
  },
  {
    title: "Histologie",
    courses: [
      { title: "Introduction à l’histologie" },
      { title: "Méthode d’étude" },
      { title: "Epithéliums de revêtement" },
      { title: "Epithéliums glandulaires" },
      { title: "Tissu conjonctif" },
      { title: "Tissu cartilagineux" },
      { title: "Tissu osseux" },
      { title: "Tissu sanguin" },
      { title: "Tissu musculaire" },
      { title: "Tissu nerveux" },
    ],
  },
  {
    title: "Biochimie",
    courses: [
      { title: "Introduction & glucides" },
      { title: "Les acides aminés" },
      { title: "Enzymologie" },
      { title: "Lipide" },
      { title: "Bioénergétique" },
      { title: "Métabolisme tissulaire" },
      { title: "Acide nucléique" },
    ],
  },
  {
    title: "Physiologie",
    courses: [
      { title: "Electrophysiologie membranaire" },
      { title: "Compartiments liquidiens" },
      { title: "Physiologie des synapses" },
      { title: "Physiologie musculaire" },
      { title: "Bioénergétique" },
      { title: "Ration alimentaire" },
      { title: "Système nerveux autonome" },
    ],
  },
];

export type Year = {
  title: string;
  modules: YearModule[];
};

export const yearsModules: Year[] = [
  { title: "annee1", modules: annee1 },
];

export const chapters: { title: string; years: string[] }[] = [
  {
    title: "Biologie",
    years: ["annee1", "annee2", "annee3"],
  },
  {
    title: "Medical",
    years: ["annee4", "annee5", "annee6"],
  },
  {
    title: "Chirurgie",
    years: ["annee4", "annee5", "annee6"],
  },
];

export function getChapterModules(title: string) {
  const yearsInChapter = chapters.find((chap) => chap?.title === title)!.years;
  const allYearsInChapter = yearsInChapter
    // remove the filter line after adding all years
    .filter((y1) => yearsModules.find((y2) => y2.title == y1))
    //
    .map((y1) => yearsModules.find((y2) => y2.title == y1)!);
  const allModulesInChapter = allYearsInChapter?.map((y) => y?.modules).flat();

  return allModulesInChapter;
}
