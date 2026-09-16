import { Title, Meta } from "@solidjs/meta";
import { For } from "solid-js";
import PersonCard, { type Person } from "~/components/PersonCard";

const ambassadors: Person[] = [
  {
    name: "Sebastian Schwemer",
    image: "/assets/images/people/sebastian.jpg",
    specialty: "Technology and Law",
    bio: "Sebastian brings deep expertise in tech policy and regulation, as Professor of Law and Technology at BI Norwegian Business School. He has advised lawmakers on key digital legislation and holds a track record of launching and advising tech ventures.",
  },
  {
    name: "Linda Liukas",
    image: "/assets/images/people/linda.JPG",
    specialty: "Children",
    bio: "As bestselling author of the Hello Ruby series, she's helped countless children and adults understand coding and technology through storytelling. Her work spans from children's books to city-scale learning initiatives and TED talks.",
  },
  {
    name: "Mathias Ockenfals",
    image: "/assets/images/people/mathias.jpg",
    specialty: "Marketplaces",
    bio: "Mathias founded The Marketplace Conference, Europe's leading event for marketplace funders and founders, positioning him as a key expert in understanding and navigating the dynamics of building successful marketplace businesses. As a partner at b2venture, he's personally led investments in more than 70 startups and supported founders through over 200 funding rounds.",
  },
  {
    name: "Henrik Torstensson",
    image: "/assets/images/people/henrik.JPG",
    specialty: "Business scaling",
    bio: "Henrik has scaled some of Europe's most successful tech companies. As head of premium sales and member of Spotify's global management team during its growth phase 2010-2013, later as CEO at Lifesum. Now a partner at Alliance VC backing early-stage Nordic startups.",
  },
  {
    name: "Neil Murray",
    image: "/assets/images/people/neil.jpg",
    specialty: "Venture Capital",
    bio: "Neil is a Solo GP and founder of The Nordic Web Ventures, investing in early-stage Nordic founders and startups. He was among the first investors in Sanity and Lovable. Before running his own fund, he founded Playmaker (YCW21).",
  },
  {
    name: "Roxanne Varza",
    image: "/assets/images/people/roxanne.JPG",
    specialty: "Start-up ecosystem",
    bio: "Roxanne is the director of STATION F in Paris, the world's biggest startup campus. She is also an angel investor and on the board of media company NRJ Group. Previously editor of TechCrunch France, startup lead for Microsoft France and scout investor for Sequoia Capital and Atomico, she has cofounded Tech.eu, StartHer and Failcon Paris.",
  },
  {
    name: "Stig Kirk Ørskov",
    image: "/assets/images/people/stig.jpg",
    imageCredit: "Philip Høfner",
    specialty: "Media",
    bio: "Stig brings extensive leadership in news media as incoming CEO of the World Association of News Publishers (WAN-IFRA). He's led Denmark's largest news publishing house for 12 years, and previously served as editor-in-chief. His background spans business journalism and media innovation across European news organisations.",
  },
  {
    name: "Christian Lindholm",
    image: "/assets/images/christian-lindholm.jpg",
    specialty: "Design",
    bio: "Christian is the inventor of the Navi Key user interface used on more than 600M phones. He is the father of Series 60 used on more than 250M early smartphones. He built KoruLab, a wearable operating system acquired by Google. Now Chairman and Co-Founder of Vertical and executive in residence at Aalto University, founder of the Future Interface Lab.",
  },
  {
    name: "Madeleine Gummer von Mohl",
    image: "/assets/images/people/madeleine.jpg",
    specialty: "Ecosystem",
    bio: "Madeleine is founder and CEO of betahaus, one of Europe's largest networks of co-working spaces across Berlin, Hamburg, Sofia and Barcelona, she's mastered creating environments where creativity and collaboration thrive. Now Managing Partner at XTR Capital.",
  },
  {
    name: "Olof Schybergson",
    image: "/assets/images/people/olof-s.jpeg",
    specialty: "Digital Products and Business Design",
    bio: "Olof co-founded and led Fjord, the global design business acquired by Accenture. During his time at Accenture Olof led and grew the design & innovation business which in 2025 was named as Red Dot 'Agency of the Year' and had over 4,000 employees in 6 continents. Olof is a pioneer in design and innovation.",
  },
  {
    name: "Marko Ahtisaari",
    image: "/assets/images/people/marko.jpg",
    imageCredit: "Joi Ito",
    specialty: "Societal",
    bio: "A Finnish technology entrepreneur and design leader. Marko has been CEO and co-founder of two technology companies: Dopplr and the Sync Project. He was also EVP of design at Nokia and a Director's Fellow at the MIT Media Lab. He recently joined ICEYE as CMO and Board Chair at the CMI Peace Foundation.",
  },
];

const foundingSupporters = [
  {
    name: "Steffen Fagerström Christensen",
    bio: "European programmer and entrepreneur behind TwentyThree, the european player in the global video space, that started as one one the worlds first photo sharing services.",
  },
  {
    name: "Martin von Haller Grønbæk",
    bio: "Pioneering European digital lawyer, thinker, investor and entrepreneur that spent the last decades at global tech lawfirm Bird & Bird.",
  },
  {
    name: "Jens Martin Skibsted",
    bio: "Visionary entrepreneur, author and designer. Has founded and shaped European design-led brands, such as Biomega.",
  },
  {
    name: "Niels Hartvig",
    bio: "European programmer and entrepreneur behind the global open source project Umbraco.",
  },
  {
    name: "Thomas Madsen-Mygdal",
    bio: "Entrepreneur and designer who spent the last 30 years building European startups, designing pioneering digital products and building platforms to move the digital world forward.",
  },
];

export default function People() {
  return (
    <>
      <Title>People | Rebuild</Title>
      <Meta
        name="description"
        content="The people supporting and driving the catalyst"
      />

      <section class="lg:pt-xl pt-0 md:pb-2xl">
        <header class="mb-sm md:mb-xl text-center w-full">
          <h1 class="font-normal text-4xl md:text-5xl lg:text-7xl">People</h1>
        </header>
      </section>

      <section class="pb-6xl">
        <div class="max-w-[1400px] mx-auto">
          {/* Hero image */}
          <div class="mb-xl mt-xl md:mt-0">
            <div class="w-full h-auto bg-muted flex items-center justify-center">
              <img
                src="/assets/images/people/core.jpg"
                alt="Margrethe Vestager, Thomas Madsen-Mygdal and Ditte Graa Wulff"
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Founder & Patron */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-xl mb-3xl md:mb-5xl">
            <div>
              <h2 class="text-xl md:text-3xl font-normal mb-md">
                Thomas Madsen-Mygdal, Founder & Chairperson
              </h2>
              <p class="text-base md:text-xl">
                Entrepreneur and designer. Spent the last 30 years building
                European startups, designing pioneering digital products, and
                building platforms to move the digital world forward.
              </p>
            </div>
            <div>
              <h2 class="text-xl md:text-3xl font-normal mb-md">
                Margrethe Vestager, Patron
              </h2>
              <p class="text-base md:text-xl">
                Former Executive VP of the EU Commission and Commissioner of
                Competition, World leader Fellow at Blavatnik Institute. Chair
                of the board of DTU.
              </p>
            </div>
          </div>

          {/* Ambassadors */}
          <section class="pb-6xl">
            <div class="max-w-[1400px] mx-auto">
              <h2 class="text-4xl md:text-5xl font-normal mb-xl">
                Ambassadors
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2xl gap-y-xl lg:gap-y-4xl">
                <For each={ambassadors}>
                  {(person) => <PersonCard person={person} />}
                </For>
              </div>
            </div>
          </section>

          {/* Founding Supporters */}
          <section class="px-lg py-xl lg:py-3xl md:px-2xl bg-dark text-blonde mb-3xl md:mb-6xl">
            <div class="max-w-[1400px] mx-auto">
              <h2 class="text-2xl md:text-3xl lg:text-5xl font-normal mb-xl">
                Founding Supporters
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2xl gap-y-2xl">
                <For each={foundingSupporters}>
                  {(supporter) => (
                    <div>
                      <h3 class="text-xl md:text-2xl font-bold mb-sm">
                        {supporter.name}
                      </h3>
                      <p class="text-xs md:text-base">{supporter.bio}</p>
                    </div>
                  )}
                </For>
              </div>
              <p class="mt-3xl text-base max-w-[384px]">
                We thank our founding supporters who have provided the funding to
                start. If you're interested in supporting,{" "}
                <a class="underline" href="mailto:team@rebuild.net">
                  contact us.
                </a>
              </p>
            </div>
          </section>

          {/* Core Team */}
          <h2 class="text-4xl md:text-5xl font-normal mb-xl">Core team</h2>
          <p class="text-base md:text-xl">
            Kristian Schwarz
            <br />
            Olivia Valentin
            <br />
            Morten Bjørn Hallkvist
            <br />
            Lital Ströbel
          </p>
        </div>
      </section>
    </>
  );
}
