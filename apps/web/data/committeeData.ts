// Committee Data Types
export interface CommitteeMember {
    name: string;
    affiliation: string;
    title?: string; // For roles like Chairman, Vice Chairman, etc.
}

export interface CommitteeCategory {
    category: string;
    members: CommitteeMember[];
}

// Conference Committee Data
export const committeeData: CommitteeCategory[] = [
    {
        category: "ADVISORS",
        members: [
            { name: "Prof. Dr. Muhammad Madyan, S.E., M.Si., M.Fin.", affiliation: "Rector of Universitas Airlangga, Indonesia" },
            { name: "Prof. apt. Junaidi Khotib, S.Si., M.Kes., Ph.D.", affiliation: "Dean of Faculty of Pharmacy, Universitas Airlangga, Indonesia" },
            { name: "apt. Noffendri, S.Si.", affiliation: "Chairman of Indonesian Pharmacists Association (IAI)" },
            { name: "Prof. Dr. apt. Yandi Syukri, S.Si., M.Si.", affiliation: "President of Association of Indonesian Pharmacy Higher Education (APTFI)" }
        ]
    },
    {
        category: "STEERING COMMITTEE",
        members: [
            { name: "Prof. Dr. apt. Arry Yanuar, M.Si.", affiliation: "Dean of Faculty of Pharmacy, Universitas Indonesia, Indonesia" },
            { name: "Prof. Dr. apt. Satibi, M.Si.", affiliation: "Dean of Faculty of Pharmacy, Universitas Gadjah Mada, Indonesia" },
            { name: "Prof. Diky Mudhakir, S.Si., M.Si., Ph.D.", affiliation: "Dean of School of Pharmacy, Institute Technology Bandung, Indonesia" },
            { name: "Prof. Dr. apt. A. Adji Prayitno S.", affiliation: "Dean of Faculty of Pharmacy, Universitas Surabaya, Indonesia" },
            { name: "Dr. apt. I Gusti Ngurah Agung Dewantara Putra, S.Farm., M.Sc.", affiliation: "Coordinator of Apothecary Education Program, Faculty of Mathematics and Natural Sciences, Universitas Udayana, Indonesia" },
            { name: "Dr. apt. Ketut Agus Adrianta, S.Farm., M.Biomed.", affiliation: "Dean of Faculty Pharmacy, Universitas Mahasaraswati Denpasar, Indonesia" },
            { name: "apt. Ida Ayu Manik Partha Sutema, S.Farm., M.Farm-Klin.", affiliation: "Coordinator of Clinical Pharmacy Program, Faculty of Health Sciences, Universitas Bali Internasional, Indonesia" },
            { name: "Ni Putu Sri Arnita, S.Pd., M.Erg.", affiliation: "Dean of Faculty of Technology and Health Sciences, Universitas Bali Dwipa, Indonesia" },
            { name: "Dr. apt. Riesta Primaharinastiti, S.Si., M.Si.", affiliation: "Vice Dean for Academic Affairs, Faculty of Pharmacy, Universitas Airlangga, Indonesia" },
            { name: "apt. Mahardian Rahmadi, S.Farm., M.Sc., Ph.D.", affiliation: "Vice Dean for Finance and Resources, Faculty of Pharmacy, Universitas Airlangga, Indonesia" },
            { name: "Prof. apt. Dewi Melani Hariyadi, S.Si., M.Phil., Ph.D.", affiliation: "Vice Dean for Research, Innovation, Community Development, and Partnership, Faculty of Pharmacy, Universitas Airlangga, Indonesia" },
            { name: "apt. Andi Hermansyah, S.Farm., M.Sc., Ph.D.", affiliation: "Head of Department of Pharmacy Practice, Faculty of Pharmacy, Universitas Airlangga, Indonesia" },
            { name: "Prof. Dr. apt. Umi Athiyah, M.S.", affiliation: "Department of Pharmacy Practice, Faculty of Pharmacy, Universitas Airlangga, Indonesia" },
            { name: "Prof. Dr. apt. Suharjono, M.S.", affiliation: "Coordinator of Clinical Pharmacy Research Group, Faculty of Pharmacy, Universitas Airlangga, Indonesia" },
            { name: "Prof. Dr. apt. Budi Suprapti, M.Si.", affiliation: "Coordinator of Master of Clinical Pharmacy Program, Faculty of Pharmacy, Universitas Airlangga, Indonesia" }
        ]
    },
    {
        category: "ORGANIZING COMMITTEE",
        members: [
            // Chairman & Vice Chairman
            { name: "Dr. apt. Yunita Nita, S.Si., M.Pharm.", affiliation: "", title: "Chairman" },
            { name: "apt. Chrismawan Ardianto, S.Farm., M.Sc., Ph.D.", affiliation: "", title: "Vice Chairman" },
            // Secretary
            { name: "Dr. apt. Zamrotul Izzah, S.Farm., M.Sc.", affiliation: "", title: "Secretary" },
            // Treasurer
            { name: "apt. Ana Yuda, S.Si., M.Farm.", affiliation: "", title: "Treasurer" },
            { name: "apt. Farida Ifadotunnikmah, S.Farm., M.Sc., Ph.D.", affiliation: "", title: "" },
            { name: "Anik Pujiati, S.E.", affiliation: "", title: "" },
            { name: "Ninik Setyaningrum Diamaria, S.H.", affiliation: "", title: "" },
            { name: "Danny Zulkarnain", affiliation: "", title: "" },
            // Administration
            { name: "apt. Anila Impian Sukorini, S.Si., M.Farm.", affiliation: "", title: "Administration" },
            { name: "apt. Dinda Monika Nusantara Ratri, S.Farm., M.Farm.Klin.", affiliation: "", title: "" },
            { name: "apt. Ni Nyoman Yudianti Mendra, S.Farm., M.Clin-Pharm.", affiliation: "", title: "" },
            { name: "apt. Indri Yuliani Hamdani, M.Farm.Klin.", affiliation: "", title: "" },
            { name: "Deddy Dwi Sutanto, S.Farm.", affiliation: "", title: "" },
            { name: "Susmiandri, S.Kom", affiliation: "", title: "" },
            { name: "M. Fuad Sofyan, Amd.", affiliation: "", title: "" },
            { name: "Irmawan Werdyanto, S.KH.", affiliation: "", title: "" },
            // Scientific Program
            { name: "apt. Elida Zairina, S.Si., M.P.H., Ph.D.", affiliation: "", title: "Scientific Program" },
            { name: "apt. Arie Sulistyarini, S.Si., M.Pharm.", affiliation: "", title: "" },
            { name: "apt. Andang Miatmoko, S.Farm., M.Sc., Ph.D.", affiliation: "", title: "" },
            { name: "apt. Febri Annuryanti, S.Farm., M.Sc., Ph.D.", affiliation: "", title: "" },
            { name: "Dr. apt. Riza Alfian, S.Farm., M.Sc.", affiliation: "", title: "" },
            { name: "Dr. apt. Dewi Susanti Atmaja, M.Farm-Klin.", affiliation: "", title: "" },
            { name: "Dr. apt. Tomi Hendrayana, S.Si., M.Si.", affiliation: "", title: "" },
            { name: "Dr. apt. Cindra Triyuniar, S.Farm., M.Si.", affiliation: "", title: "" },
            { name: "apt. Eko Setiawan, Ph.D.", affiliation: "", title: "" },
            { name: "apt. Bobby Presley, Ph.D.", affiliation: "", title: "" },
            // Event Management
            { name: "apt. Gusti Noorrizka Veronika Achmad, S.Si., M.Sc.", affiliation: "", title: "Event Management" },
            { name: "Dr. apt. Samirah, S.Si., Sp.FRS.", affiliation: "", title: "" },
            { name: "Dr. apt. Wenny Putri Nilamsari, S.Farm., Sp.FRS.", affiliation: "", title: "" },
            { name: "Dr. apt. I Nyoman Wijaya, Drs., Sp.FRS.", affiliation: "", title: "" },
            { name: "apt. Melanny Ika Sulistyowaty, S.Farm., M.Sc., Ph.D.", affiliation: "", title: "" },
            { name: "apt. Dewa Ayu Sri Handani, S.Farm., M.Clin.Pharm.", affiliation: "", title: "" },
            { name: "apt. Angelia Wulansari Budiman, S.Farm., M.M.", affiliation: "", title: "" },
            { name: "apt. Maya Ramadhani Indarto, M.Clin.Pharm.", affiliation: "", title: "" },
            // Exhibition
            { name: "apt. Firmansyah Ardian Ramadhani, S.Farm., M.Farm.", affiliation: "", title: "Exhibition" },
            { name: "apt. Yusuf Alif Pratama, S.Farm., M.Farm.", affiliation: "", title: "" },
            { name: "apt. Putu Bagus Pradnya Putra Budiartha, S.Farm., M.Pharm.", affiliation: "", title: "" },
            { name: "Henky Soekma Poetra, S.T.", affiliation: "", title: "" },
            // Fundraising
            { name: "Dr. apt. Abdul Rahem, M.Kes.", affiliation: "", title: "Fundraising" },
            { name: "Prof. Dr. apt. Yulistiani, Dra., M.Si.", affiliation: "", title: "" },
            // Food and Beverage
            { name: "Dr. apt. Neny Purwitasari, S.Farm., M.Sc.", affiliation: "", title: "Food and Beverage" },
            { name: "Dr. apt. Yuni Priyandani, S.Si., Sp.FRS.", affiliation: "", title: "" },
            { name: "Prof. Dr. apt. Aniek Setiya Budiatin, M.Si.", affiliation: "", title: "" },
            { name: "apt. Dhiancinantyan Windydaca Brata Putri S.Farm., M.Farm.", affiliation: "", title: "" },
            { name: "apt. Padmi Dewi S.Farm., M.M.", affiliation: "", title: "" },
            { name: "apt. Annisa Lazuardi Larasati, M.Farm.", affiliation: "", title: "" },
            { name: "apt. Ika Mulyono Putri Wibowo, M.Farm-Klin.", affiliation: "", title: "" },
            // Facilities and Equipment
            { name: "apt. Catur Dian Setiawan, S.Farm., M.Kes.", affiliation: "", title: "Facilities and Equipment" },
            { name: "Dr. apt. Sumarno, Drs., Sp.FRS.", affiliation: "", title: "" },
            { name: "apt. I Putu Yogi Astara Putra, S.Farm., M.Si.", affiliation: "", title: "" },
            { name: "Furqan Daniel Akhsani Taqwim, S.Kom.", affiliation: "", title: "" }
        ]
    }
]
