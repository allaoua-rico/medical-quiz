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

type Years = {
  year: string;
  modules: YearModule[];
};

const yearsModules: Years[] = [
  { year: "annee1", modules: annee1 },
  // this line was error:
  // Error: The function does not contain a statement matching 'return variableName;', js engine: hermes
  // { year: getVariableName(() => annee1), modules: annee1 },
];

export default yearsModules;
