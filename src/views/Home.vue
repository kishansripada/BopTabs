<template>
  <body id="page-top">
    <header class="masthead pt-5 mt-5 pb-5 mb-5">
      <div class="container px-5">
        <div class="row gx-5 align-items-center">
          <div class="col-lg-6">
            <!-- Mashead text and app badges-->
            <div class="mb-5 mb-lg-0 text-center text-lg-start">
              <h1 class="display-1 lh-1 mb-3">
                Interactive tablatures and chords synced to Spotify
              </h1>
              <p class="lead fw-normal text-muted mb-5">
                A modern take on the traditional static tabs and chord charts
                allowing you to play along with your favorite songs, listening
                to Spotify at the same time!
              </p>
              <div
                class="d-flex flex-column flex-lg-row align-items-center"
              ></div>
            </div>
          </div>
          <div class="col-lg-6">
            <!-- Masthead device mockup feature-->
            <div class="masthead-device-mockup">
              <div class="device-wrapper">
                <div
                  class="device"
                  data-device="iPhoneX"
                  data-orientation="portrait"
                  data-color="black"
                >
                  <div class="screen">
                    <h3 class="display-5 mb-4">
                      Explore recently added tracks
                    </h3>
                    <div v-for="track in exampleTracks" :key="track.id">
                      <router-link
                        style="text-decoration: none; color: black"
                        :to="`/track/${track.id}/tabs/1`"
                        ><a
                          href="#"
                          class="
                            list-group-item list-group-item-action
                            d-flex
                            gap-3
                            py-3
                          "
                          aria-current="true"
                        >
                          <img
                            :src="`${track.url}`"
                            alt="twbs"
                            width="50"
                            height="50"
                            style="border-radius: 10%"
                            class="flex-shrink-0"
                          />
                          <div
                            class="d-flex gap-2 w-100 justify-content-between"
                          >
                            <div>
                              <h6 class="mb-0">{{ track.name }}</h6>
                              <p class="mb-0 opacity-75">
                                {{
                                  track.artists
                                    .map((artist) => artist.name)
                                    .join(", ")
                                }}
                              </p>
                            </div>
                            <button type="button" class="btn btn-primary">
                              View Tab
                            </button>
                          </div>
                        </a></router-link
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section class="pb-5">
      <div class="container px-5">
        <div
          class="
            row
            align-items-center
            justify-content-center justify-content-lg-between
          "
        >
          <div class="col-lg-4">
            <h2 class="display-4 lh-1 mb-4">
              Listen to your tablatures, don't guess the rhythm
            </h2>
            <p class="lead fw-normal text-muted mb-5 mb-lg-0">
              Follow along a synced chord chart while listening to your favorite
              songs in the background.
            </p>
          </div>
          <div class="col-md-8">
            <div class="">
              <div>
                <div
                  class="rounded-3 position-relative"
                  style="height: 400px"
                  ref="embedContainer"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pt-5 mt-5">
      <div class="container px-5">
        <div
          class="
            row
            gx-5
            align-items-center
            justify-content-center justify-content-lg-between
          "
        >
          <div class="col-lg-4">
            <h2 class="display-4 lh-1 mb-4">
              Don't guess when a chord starts or ends.
            </h2>
            <p class="lead fw-normal text-muted mb-5 mb-lg-0">
              Follow along a synced chord chart while listening to your favorite
              songs in the background.
            </p>
          </div>
          <div class="col-md-8">
            <div class="px-5 px-sm-0">
              <video
                muted="muted"
                autoplay=""
                loop=""
                style="max-width: 100%; height: 100%"
              >
                <source src="../assets/chordDemo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  </body>
</template>
<script>
import Embed from "flat-embed";
import { mapFields } from "vuex-map-fields";

export default {
  name: "Home",
  data() {
    return {
      exampleTracks: [
        {
          id: "7iHHxY2NLlJRAmlAmC4ahQ",
          artists: [
            {
              name: "Lil Mosey",
            },
            {
              name: "Gunna",
            },
          ],
          url: "https://i.scdn.co/image/ab67616d0000b27332ba22ba4df6a89bb6bfe3cf",
          name: "Stuck In A Dream (feat. Gunna)",
        },
        {
          id: "1wJRveJZLSb1rjhnUHQiv6",
          artists: [
            {
              name: "A Boogie Wit da Hoodie",
            },
            {
              name: "6ix9ine",
            },
          ],
          url: "https://i.scdn.co/image/ab67616d0000b273dcfadea246002a5c0fd7b1b8",
          name: "Swervin (feat. 6ix9ine)",
        },
        {
          id: "4cSSL3YafYjM3yjgFO1vJg",
          artists: [
            {
              name: "NLE Choppa",
            },
            {
              name: "Roddy Ricch",
            },
          ],
          url: "https://i.scdn.co/image/ab67616d0000b273e64fb9f283bc9a258801b548",
          name: "Walk Em Down (feat. Roddy Ricch)",
        },
        {
          id: "2ktxr00GpTtbMNeBjNeY8D",
          artists: [
            {
              name: "Trippie Redd",
            },
          ],
          url: "https://i.scdn.co/image/ab67616d0000b273cd81b9f0393348b6537c9d92",
          name: "Who Needs Love",
        },
      ],
      embed: null,
    };
  },

  methods: {},

  async mounted() {
    var container = this.$refs.embedContainer;
    this.embed = new Embed(container, {
      embedParams: {
        appId: "5fe56705315dc443c12fb489",
        controlsPosition: "bottom",
        layout: "track",
        displayFirstLinePartsNames: false,
        controlsPanel: false,
        controlsZoom: false,
      },
    });
    this.embed.loadMusicXML(`<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE score-partwise PUBLIC '-//Recordare//DTD MusicXML 2.0 Partwise//EN' 'http://www.musicxml.org/dtds/2.0/partwise.dtd'>
<score-partwise version="2.0">
 <work>
  <work-title>Who Needs Love</work-title>
 </work>
 <identification>
  <creator type="composer">Trippie Red</creator>
  <creator type="transcriber">Kishan Sripada </creator>
  <encoding>
   <encoding-date>2020-12-25</encoding-date>
   <software>Guitar Pro 7.5.5</software>
   <encoder>Kishan Sripada </encoder>
   <supports element="print" value="yes" type="yes" attribute="new-system"/>
  </encoding>
 </identification>
 <defaults>
  <scaling>
   <millimeters>6.4</millimeters>
   <tenths>40</tenths>
  </scaling>
  <page-layout>
   <page-height>1850</page-height>
   <page-width>1310</page-width>
  </page-layout>
 </defaults>
 <credit>
  <credit-words justify="center" valign="top" font-size="24">Who Needs Love</credit-words>
 </credit>
 <credit>
  <credit-words justify="center" valign="top" font-size="14">Trippie Red</credit-words>
 </credit>
 <credit>
  <credit-words justify="center" valign="top" font-size="14">A Love Letter To You 4</credit-words>
 </credit>
 <part-list>
  <score-part id="P1">
   <part-name>Steel Guitar</part-name>
   <part-abbreviation>s.guit.</part-abbreviation>
   <midi-instrument id="P1">
    <midi-channel>1</midi-channel>
    <midi-bank>1</midi-bank>
    <midi-program>26</midi-program>
    <volume>80</volume>
    <pan>0</pan>
   </midi-instrument>
  </score-part>
 </part-list>
 <part id="P1">
  <measure number="1">
   <attributes>
    <divisions>4</divisions>
    <key>
     <fifths>-3</fifths>
     <mode>major</mode>
    </key>
    <time>
     <beats>4</beats>
     <beat-type>4</beat-type>
    </time>
    <staves>2</staves>
    <clef number="1">
     <sign>G</sign>
     <line>2</line>
    </clef>
    <clef number="2">
     <sign>TAB</sign>
     <line>5</line>
    </clef>
    <staff-details number="1">
     <staff-tuning line="1">
      <tuning-step>E</tuning-step>
      <tuning-octave>2</tuning-octave>
     </staff-tuning>
     <staff-tuning line="2">
      <tuning-step>A</tuning-step>
      <tuning-octave>2</tuning-octave>
     </staff-tuning>
     <staff-tuning line="3">
      <tuning-step>D</tuning-step>
      <tuning-octave>3</tuning-octave>
     </staff-tuning>
     <staff-tuning line="4">
      <tuning-step>G</tuning-step>
      <tuning-octave>3</tuning-octave>
     </staff-tuning>
     <staff-tuning line="5">
      <tuning-step>B</tuning-step>
      <tuning-octave>3</tuning-octave>
     </staff-tuning>
     <staff-tuning line="6">
      <tuning-step>E</tuning-step>
      <tuning-octave>4</tuning-octave>
     </staff-tuning>
    </staff-details>
    <staff-details number="2">
     <staff-lines>6</staff-lines>
     <staff-tuning line="1">
      <tuning-step>E</tuning-step>
      <tuning-octave>2</tuning-octave>
     </staff-tuning>
     <staff-tuning line="2">
      <tuning-step>A</tuning-step>
      <tuning-octave>2</tuning-octave>
     </staff-tuning>
     <staff-tuning line="3">
      <tuning-step>D</tuning-step>
      <tuning-octave>3</tuning-octave>
     </staff-tuning>
     <staff-tuning line="4">
      <tuning-step>G</tuning-step>
      <tuning-octave>3</tuning-octave>
     </staff-tuning>
     <staff-tuning line="5">
      <tuning-step>B</tuning-step>
      <tuning-octave>3</tuning-octave>
     </staff-tuning>
     <staff-tuning line="6">
      <tuning-step>E</tuning-step>
      <tuning-octave>4</tuning-octave>
     </staff-tuning>
    </staff-details>
    <transpose number="1">
     <diatonic>0</diatonic>
     <chromatic>0</chromatic>
     <octave-change>-1</octave-change>
    </transpose>
   </attributes>
   <direction directive="yes">
    <direction-type>
     <metronome parentheses="no" default-y="40">
      <beat-unit>quarter</beat-unit>
      <per-minute>110</per-minute>
     </metronome>
    </direction-type>
    <sound tempo="110"/>
   </direction>
   <note>
    <pitch>
     <step>C</step>
     <octave>4</octave>
    </pitch>
    <duration>3</duration>
    <voice>1</voice>
    <type>eighth</type>
    <dot/>
    <accidental>natural</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">begin</beam>
    <notations>
     <dynamics>
      <mf/>
     </dynamics>
    </notations>
   </note>
   <note>
    <pitch>
     <step>G</step>
     <octave>4</octave>
    </pitch>
    <duration>3</duration>
    <voice>1</voice>
    <type>eighth</type>
    <dot/>
    <accidental>natural</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">continue</beam>
    <notations>
     <dynamics>
      <mf/>
     </dynamics>
    </notations>
   </note>
   <note>
    <pitch>
     <step>C</step>
     <octave>5</octave>
    </pitch>
    <duration>2</duration>
    <voice>1</voice>
    <type>eighth</type>
    <accidental>natural</accidental>
    <stem>down</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">end</beam>
    <notations>
     <dynamics>
      <mf/>
     </dynamics>
    </notations>
   </note>
   <note>
    <chord/>
    <pitch>
     <step>E</step>
     <alter>-1</alter>
     <octave>5</octave>
    </pitch>
    <duration>2</duration>
    <voice>1</voice>
    <type>eighth</type>
    <accidental>flat</accidental>
    <stem>down</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">end</beam>
    <notations>
     <dynamics>
      <mf/>
     </dynamics>
    </notations>
   </note>
   <note>
    <rest/>
    <duration>8</duration>
    <voice>1</voice>
    <type>half</type>
    <staff>1</staff>
   </note>
   <backup>
    <duration>16</duration>
   </backup>
   <note>
    <pitch>
     <step>C</step>
     <octave>3</octave>
    </pitch>
    <duration>3</duration>
    <voice>5</voice>
    <type>eighth</type>
    <dot/>
    <accidental>natural</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">begin</beam>
    <notations>
     <dynamics>
      <mf/>
     </dynamics>
     <technical>
      <string>5</string>
      <fret>3</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>G</step>
     <octave>3</octave>
    </pitch>
    <duration>3</duration>
    <voice>5</voice>
    <type>eighth</type>
    <dot/>
    <accidental>natural</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">continue</beam>
    <notations>
     <dynamics>
      <mf/>
     </dynamics>
     <technical>
      <string>4</string>
      <fret>5</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>C</step>
     <octave>4</octave>
    </pitch>
    <duration>2</duration>
    <voice>5</voice>
    <type>eighth</type>
    <accidental>natural</accidental>
    <stem>down</stem>
    <staff>2</staff>
    <beam number="1">end</beam>
    <notations>
     <dynamics>
      <mf/>
     </dynamics>
     <technical>
      <string>3</string>
      <fret>5</fret>
     </technical>
    </notations>
   </note>
   <note>
    <chord/>
    <pitch>
     <step>E</step>
     <alter>-1</alter>
     <octave>4</octave>
    </pitch>
    <duration>2</duration>
    <voice>5</voice>
    <type>eighth</type>
    <accidental>flat</accidental>
    <stem>down</stem>
    <staff>2</staff>
    <beam number="1">end</beam>
    <notations>
     <dynamics>
      <mf/>
     </dynamics>
     <technical>
      <string>2</string>
      <fret>4</fret>
     </technical>
    </notations>
   </note>
   <note>
    <rest/>
    <duration>8</duration>
    <voice>5</voice>
    <type>half</type>
    <staff>2</staff>
   </note>
   <barline location="left">
    <repeat direction="forward" times="99"/>
   </barline>
  </measure>
  <measure number="2">
   <note>
    <pitch>
     <step>C</step>
     <octave>4</octave>
    </pitch>
    <duration>3</duration>
    <voice>1</voice>
    <type>eighth</type>
    <dot/>
    <accidental>natural</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">begin</beam>
   </note>
   <note>
    <pitch>
     <step>G</step>
     <octave>4</octave>
    </pitch>
    <duration>3</duration>
    <voice>1</voice>
    <type>eighth</type>
    <dot/>
    <accidental>natural</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">continue</beam>
   </note>
   <note>
    <pitch>
     <step>C</step>
     <octave>5</octave>
    </pitch>
    <duration>2</duration>
    <voice>1</voice>
    <type>eighth</type>
    <accidental>natural</accidental>
    <stem>down</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">end</beam>
   </note>
   <note>
    <chord/>
    <pitch>
     <step>E</step>
     <alter>-1</alter>
     <octave>5</octave>
    </pitch>
    <duration>2</duration>
    <voice>1</voice>
    <type>eighth</type>
    <accidental>flat</accidental>
    <stem>down</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">end</beam>
   </note>
   <note>
    <rest/>
    <duration>8</duration>
    <voice>1</voice>
    <type>half</type>
    <staff>1</staff>
   </note>
   <backup>
    <duration>16</duration>
   </backup>
   <note>
    <pitch>
     <step>C</step>
     <octave>3</octave>
    </pitch>
    <duration>3</duration>
    <voice>5</voice>
    <type>eighth</type>
    <dot/>
    <accidental>natural</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">begin</beam>
    <notations>
     <technical>
      <string>5</string>
      <fret>3</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>G</step>
     <octave>3</octave>
    </pitch>
    <duration>3</duration>
    <voice>5</voice>
    <type>eighth</type>
    <dot/>
    <accidental>natural</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">continue</beam>
    <notations>
     <technical>
      <string>4</string>
      <fret>5</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>C</step>
     <octave>4</octave>
    </pitch>
    <duration>2</duration>
    <voice>5</voice>
    <type>eighth</type>
    <accidental>natural</accidental>
    <stem>down</stem>
    <staff>2</staff>
    <beam number="1">end</beam>
    <notations>
     <technical>
      <string>3</string>
      <fret>5</fret>
     </technical>
    </notations>
   </note>
   <note>
    <chord/>
    <pitch>
     <step>E</step>
     <alter>-1</alter>
     <octave>4</octave>
    </pitch>
    <duration>2</duration>
    <voice>5</voice>
    <type>eighth</type>
    <accidental>flat</accidental>
    <stem>down</stem>
    <staff>2</staff>
    <beam number="1">end</beam>
    <notations>
     <technical>
      <string>2</string>
      <fret>4</fret>
     </technical>
    </notations>
   </note>
   <note>
    <rest/>
    <duration>8</duration>
    <voice>5</voice>
    <type>half</type>
    <staff>2</staff>
   </note>
  </measure>
  <measure number="3">
   <note>
    <pitch>
     <step>A</step>
     <alter>-1</alter>
     <octave>3</octave>
    </pitch>
    <duration>3</duration>
    <voice>1</voice>
    <type>eighth</type>
    <dot/>
    <accidental>flat</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">begin</beam>
   </note>
   <note>
    <pitch>
     <step>E</step>
     <alter>-1</alter>
     <octave>4</octave>
    </pitch>
    <duration>3</duration>
    <voice>1</voice>
    <type>eighth</type>
    <dot/>
    <accidental>flat</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">continue</beam>
   </note>
   <note>
    <pitch>
     <step>C</step>
     <octave>5</octave>
    </pitch>
    <duration>2</duration>
    <voice>1</voice>
    <type>eighth</type>
    <accidental>natural</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">end</beam>
   </note>
   <note>
    <chord/>
    <pitch>
     <step>A</step>
     <alter>-1</alter>
     <octave>4</octave>
    </pitch>
    <duration>2</duration>
    <voice>1</voice>
    <type>eighth</type>
    <accidental>flat</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">end</beam>
   </note>
   <note>
    <rest/>
    <duration>8</duration>
    <voice>1</voice>
    <type>half</type>
    <staff>1</staff>
   </note>
   <backup>
    <duration>16</duration>
   </backup>
   <note>
    <pitch>
     <step>A</step>
     <alter>-1</alter>
     <octave>2</octave>
    </pitch>
    <duration>3</duration>
    <voice>5</voice>
    <type>eighth</type>
    <dot/>
    <accidental>flat</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">begin</beam>
    <notations>
     <technical>
      <string>6</string>
      <fret>4</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>E</step>
     <alter>-1</alter>
     <octave>3</octave>
    </pitch>
    <duration>3</duration>
    <voice>5</voice>
    <type>eighth</type>
    <dot/>
    <accidental>flat</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">continue</beam>
    <notations>
     <technical>
      <string>5</string>
      <fret>6</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>C</step>
     <octave>4</octave>
    </pitch>
    <duration>2</duration>
    <voice>5</voice>
    <type>eighth</type>
    <accidental>natural</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">end</beam>
    <notations>
     <technical>
      <string>3</string>
      <fret>5</fret>
     </technical>
    </notations>
   </note>
   <note>
    <chord/>
    <pitch>
     <step>A</step>
     <alter>-1</alter>
     <octave>3</octave>
    </pitch>
    <duration>2</duration>
    <voice>5</voice>
    <type>eighth</type>
    <accidental>flat</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">end</beam>
    <notations>
     <technical>
      <string>4</string>
      <fret>6</fret>
     </technical>
    </notations>
   </note>
   <note>
    <rest/>
    <duration>8</duration>
    <voice>5</voice>
    <type>half</type>
    <staff>2</staff>
   </note>
  </measure>
  <measure number="4">
   <note>
    <pitch>
     <step>A</step>
     <alter>-1</alter>
     <octave>3</octave>
    </pitch>
    <duration>3</duration>
    <voice>1</voice>
    <type>eighth</type>
    <dot/>
    <accidental>flat</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">begin</beam>
   </note>
   <note>
    <pitch>
     <step>E</step>
     <alter>-1</alter>
     <octave>4</octave>
    </pitch>
    <duration>3</duration>
    <voice>1</voice>
    <type>eighth</type>
    <dot/>
    <accidental>flat</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">continue</beam>
   </note>
   <note>
    <pitch>
     <step>C</step>
     <octave>5</octave>
    </pitch>
    <duration>2</duration>
    <voice>1</voice>
    <type>eighth</type>
    <accidental>natural</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">end</beam>
   </note>
   <note>
    <chord/>
    <pitch>
     <step>A</step>
     <alter>-1</alter>
     <octave>4</octave>
    </pitch>
    <duration>2</duration>
    <voice>1</voice>
    <type>eighth</type>
    <accidental>flat</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">end</beam>
   </note>
   <note>
    <rest/>
    <duration>4</duration>
    <voice>1</voice>
    <type>quarter</type>
    <staff>1</staff>
   </note>
   <note>
    <pitch>
     <step>A</step>
     <alter>-1</alter>
     <octave>3</octave>
    </pitch>
    <duration>2</duration>
    <voice>1</voice>
    <type>eighth</type>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">begin</beam>
   </note>
   <note>
    <pitch>
     <step>G</step>
     <octave>3</octave>
    </pitch>
    <duration>2</duration>
    <voice>1</voice>
    <type>eighth</type>
    <accidental>natural</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">end</beam>
   </note>
   <backup>
    <duration>16</duration>
   </backup>
   <note>
    <pitch>
     <step>A</step>
     <alter>-1</alter>
     <octave>2</octave>
    </pitch>
    <duration>3</duration>
    <voice>5</voice>
    <type>eighth</type>
    <dot/>
    <accidental>flat</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">begin</beam>
    <notations>
     <technical>
      <string>6</string>
      <fret>4</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>E</step>
     <alter>-1</alter>
     <octave>3</octave>
    </pitch>
    <duration>3</duration>
    <voice>5</voice>
    <type>eighth</type>
    <dot/>
    <accidental>flat</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">continue</beam>
    <notations>
     <technical>
      <string>5</string>
      <fret>6</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>C</step>
     <octave>4</octave>
    </pitch>
    <duration>2</duration>
    <voice>5</voice>
    <type>eighth</type>
    <accidental>natural</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">end</beam>
    <notations>
     <technical>
      <string>3</string>
      <fret>5</fret>
     </technical>
    </notations>
   </note>
   <note>
    <chord/>
    <pitch>
     <step>A</step>
     <alter>-1</alter>
     <octave>3</octave>
    </pitch>
    <duration>2</duration>
    <voice>5</voice>
    <type>eighth</type>
    <accidental>flat</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">end</beam>
    <notations>
     <technical>
      <string>4</string>
      <fret>6</fret>
     </technical>
    </notations>
   </note>
   <note>
    <rest/>
    <duration>4</duration>
    <voice>5</voice>
    <type>quarter</type>
    <staff>2</staff>
   </note>
   <note>
    <pitch>
     <step>A</step>
     <alter>-1</alter>
     <octave>2</octave>
    </pitch>
    <duration>2</duration>
    <voice>5</voice>
    <type>eighth</type>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">begin</beam>
    <notations>
     <technical>
      <string>6</string>
      <fret>4</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>G</step>
     <octave>2</octave>
    </pitch>
    <duration>2</duration>
    <voice>5</voice>
    <type>eighth</type>
    <accidental>natural</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">end</beam>
    <notations>
     <technical>
      <string>6</string>
      <fret>3</fret>
     </technical>
    </notations>
   </note>
  </measure>
  <measure number="5">
   <print new-system="yes"/>
   <note>
    <pitch>
     <step>F</step>
     <octave>3</octave>
    </pitch>
    <duration>3</duration>
    <voice>1</voice>
    <type>eighth</type>
    <dot/>
    <accidental>natural</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">begin</beam>
   </note>
   <note>
    <pitch>
     <step>C</step>
     <octave>4</octave>
    </pitch>
    <duration>3</duration>
    <voice>1</voice>
    <type>eighth</type>
    <dot/>
    <accidental>natural</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">continue</beam>
   </note>
   <note>
    <pitch>
     <step>F</step>
     <octave>4</octave>
    </pitch>
    <duration>2</duration>
    <voice>1</voice>
    <type>eighth</type>
    <accidental>natural</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">end</beam>
   </note>
   <note>
    <chord/>
    <pitch>
     <step>A</step>
     <alter>-1</alter>
     <octave>4</octave>
    </pitch>
    <duration>2</duration>
    <voice>1</voice>
    <type>eighth</type>
    <accidental>flat</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">end</beam>
   </note>
   <note>
    <rest/>
    <duration>8</duration>
    <voice>1</voice>
    <type>half</type>
    <staff>1</staff>
   </note>
   <backup>
    <duration>16</duration>
   </backup>
   <note>
    <pitch>
     <step>F</step>
     <octave>2</octave>
    </pitch>
    <duration>3</duration>
    <voice>5</voice>
    <type>eighth</type>
    <dot/>
    <accidental>natural</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">begin</beam>
    <notations>
     <technical>
      <string>6</string>
      <fret>1</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>C</step>
     <octave>3</octave>
    </pitch>
    <duration>3</duration>
    <voice>5</voice>
    <type>eighth</type>
    <dot/>
    <accidental>natural</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">continue</beam>
    <notations>
     <technical>
      <string>5</string>
      <fret>3</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>F</step>
     <octave>3</octave>
    </pitch>
    <duration>2</duration>
    <voice>5</voice>
    <type>eighth</type>
    <accidental>natural</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">end</beam>
    <notations>
     <technical>
      <string>4</string>
      <fret>3</fret>
     </technical>
    </notations>
   </note>
   <note>
    <chord/>
    <pitch>
     <step>A</step>
     <alter>-1</alter>
     <octave>3</octave>
    </pitch>
    <duration>2</duration>
    <voice>5</voice>
    <type>eighth</type>
    <accidental>flat</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">end</beam>
    <notations>
     <technical>
      <string>3</string>
      <fret>1</fret>
     </technical>
    </notations>
   </note>
   <note>
    <rest/>
    <duration>8</duration>
    <voice>5</voice>
    <type>half</type>
    <staff>2</staff>
   </note>
  </measure>
  <measure number="6">
   <note>
    <pitch>
     <step>F</step>
     <octave>3</octave>
    </pitch>
    <duration>3</duration>
    <voice>1</voice>
    <type>eighth</type>
    <dot/>
    <accidental>natural</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">begin</beam>
   </note>
   <note>
    <pitch>
     <step>C</step>
     <octave>4</octave>
    </pitch>
    <duration>3</duration>
    <voice>1</voice>
    <type>eighth</type>
    <dot/>
    <accidental>natural</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">continue</beam>
   </note>
   <note>
    <pitch>
     <step>F</step>
     <octave>4</octave>
    </pitch>
    <duration>2</duration>
    <voice>1</voice>
    <type>eighth</type>
    <accidental>natural</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">end</beam>
   </note>
   <note>
    <chord/>
    <pitch>
     <step>A</step>
     <alter>-1</alter>
     <octave>4</octave>
    </pitch>
    <duration>2</duration>
    <voice>1</voice>
    <type>eighth</type>
    <accidental>flat</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">end</beam>
   </note>
   <note>
    <rest/>
    <duration>8</duration>
    <voice>1</voice>
    <type>half</type>
    <staff>1</staff>
   </note>
   <backup>
    <duration>16</duration>
   </backup>
   <note>
    <pitch>
     <step>F</step>
     <octave>2</octave>
    </pitch>
    <duration>3</duration>
    <voice>5</voice>
    <type>eighth</type>
    <dot/>
    <accidental>natural</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">begin</beam>
    <notations>
     <technical>
      <string>6</string>
      <fret>1</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>C</step>
     <octave>3</octave>
    </pitch>
    <duration>3</duration>
    <voice>5</voice>
    <type>eighth</type>
    <dot/>
    <accidental>natural</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">continue</beam>
    <notations>
     <technical>
      <string>5</string>
      <fret>3</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>F</step>
     <octave>3</octave>
    </pitch>
    <duration>2</duration>
    <voice>5</voice>
    <type>eighth</type>
    <accidental>natural</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">end</beam>
    <notations>
     <technical>
      <string>4</string>
      <fret>3</fret>
     </technical>
    </notations>
   </note>
   <note>
    <chord/>
    <pitch>
     <step>A</step>
     <alter>-1</alter>
     <octave>3</octave>
    </pitch>
    <duration>2</duration>
    <voice>5</voice>
    <type>eighth</type>
    <accidental>flat</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">end</beam>
    <notations>
     <technical>
      <string>3</string>
      <fret>1</fret>
     </technical>
    </notations>
   </note>
   <note>
    <rest/>
    <duration>8</duration>
    <voice>5</voice>
    <type>half</type>
    <staff>2</staff>
   </note>
  </measure>
  <measure number="7">
   <note>
    <pitch>
     <step>A</step>
     <alter>-1</alter>
     <octave>3</octave>
    </pitch>
    <duration>3</duration>
    <voice>1</voice>
    <type>eighth</type>
    <dot/>
    <accidental>flat</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">begin</beam>
   </note>
   <note>
    <pitch>
     <step>E</step>
     <alter>-1</alter>
     <octave>4</octave>
    </pitch>
    <duration>3</duration>
    <voice>1</voice>
    <type>eighth</type>
    <dot/>
    <accidental>flat</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">continue</beam>
   </note>
   <note>
    <pitch>
     <step>C</step>
     <octave>5</octave>
    </pitch>
    <duration>2</duration>
    <voice>1</voice>
    <type>eighth</type>
    <accidental>natural</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">end</beam>
   </note>
   <note>
    <chord/>
    <pitch>
     <step>A</step>
     <alter>-1</alter>
     <octave>4</octave>
    </pitch>
    <duration>2</duration>
    <voice>1</voice>
    <type>eighth</type>
    <accidental>flat</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">end</beam>
   </note>
   <note>
    <rest/>
    <duration>8</duration>
    <voice>1</voice>
    <type>half</type>
    <staff>1</staff>
   </note>
   <backup>
    <duration>16</duration>
   </backup>
   <note>
    <pitch>
     <step>A</step>
     <alter>-1</alter>
     <octave>2</octave>
    </pitch>
    <duration>3</duration>
    <voice>5</voice>
    <type>eighth</type>
    <dot/>
    <accidental>flat</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">begin</beam>
    <notations>
     <technical>
      <string>6</string>
      <fret>4</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>E</step>
     <alter>-1</alter>
     <octave>3</octave>
    </pitch>
    <duration>3</duration>
    <voice>5</voice>
    <type>eighth</type>
    <dot/>
    <accidental>flat</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">continue</beam>
    <notations>
     <technical>
      <string>5</string>
      <fret>6</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>C</step>
     <octave>4</octave>
    </pitch>
    <duration>2</duration>
    <voice>5</voice>
    <type>eighth</type>
    <accidental>natural</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">end</beam>
    <notations>
     <technical>
      <string>3</string>
      <fret>5</fret>
     </technical>
    </notations>
   </note>
   <note>
    <chord/>
    <pitch>
     <step>A</step>
     <alter>-1</alter>
     <octave>3</octave>
    </pitch>
    <duration>2</duration>
    <voice>5</voice>
    <type>eighth</type>
    <accidental>flat</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">end</beam>
    <notations>
     <technical>
      <string>4</string>
      <fret>6</fret>
     </technical>
    </notations>
   </note>
   <note>
    <rest/>
    <duration>8</duration>
    <voice>5</voice>
    <type>half</type>
    <staff>2</staff>
   </note>
  </measure>
  <measure number="8">
   <note>
    <pitch>
     <step>B</step>
     <alter>-1</alter>
     <octave>3</octave>
    </pitch>
    <duration>3</duration>
    <voice>1</voice>
    <type>eighth</type>
    <dot/>
    <accidental>flat</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">begin</beam>
   </note>
   <note>
    <pitch>
     <step>F</step>
     <octave>4</octave>
    </pitch>
    <duration>3</duration>
    <voice>1</voice>
    <type>eighth</type>
    <dot/>
    <accidental>natural</accidental>
    <stem>up</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">continue</beam>
   </note>
   <note>
    <pitch>
     <step>D</step>
     <octave>5</octave>
    </pitch>
    <duration>2</duration>
    <voice>1</voice>
    <type>eighth</type>
    <stem>down</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">end</beam>
   </note>
   <note>
    <chord/>
    <pitch>
     <step>B</step>
     <alter>-1</alter>
     <octave>4</octave>
    </pitch>
    <duration>2</duration>
    <voice>1</voice>
    <type>eighth</type>
    <accidental>flat</accidental>
    <stem>down</stem>
    <notehead>normal</notehead>
    <staff>1</staff>
    <beam number="1">end</beam>
   </note>
   <note>
    <rest/>
    <duration>8</duration>
    <voice>1</voice>
    <type>half</type>
    <staff>1</staff>
   </note>
   <backup>
    <duration>16</duration>
   </backup>
   <note>
    <pitch>
     <step>B</step>
     <alter>-1</alter>
     <octave>2</octave>
    </pitch>
    <duration>3</duration>
    <voice>5</voice>
    <type>eighth</type>
    <dot/>
    <accidental>flat</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">begin</beam>
    <notations>
     <technical>
      <string>6</string>
      <fret>6</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>F</step>
     <octave>3</octave>
    </pitch>
    <duration>3</duration>
    <voice>5</voice>
    <type>eighth</type>
    <dot/>
    <accidental>natural</accidental>
    <stem>up</stem>
    <staff>2</staff>
    <beam number="1">continue</beam>
    <notations>
     <technical>
      <string>5</string>
      <fret>8</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>D</step>
     <octave>4</octave>
    </pitch>
    <duration>2</duration>
    <voice>5</voice>
    <type>eighth</type>
    <stem>down</stem>
    <staff>2</staff>
    <beam number="1">end</beam>
    <notations>
     <technical>
      <string>3</string>
      <fret>7</fret>
     </technical>
    </notations>
   </note>
   <note>
    <chord/>
    <pitch>
     <step>B</step>
     <alter>-1</alter>
     <octave>3</octave>
    </pitch>
    <duration>2</duration>
    <voice>5</voice>
    <type>eighth</type>
    <accidental>flat</accidental>
    <stem>down</stem>
    <staff>2</staff>
    <beam number="1">end</beam>
    <notations>
     <technical>
      <string>4</string>
      <fret>8</fret>
     </technical>
    </notations>
   </note>
   <note>
    <rest/>
    <duration>8</duration>
    <voice>5</voice>
    <type>half</type>
    <staff>2</staff>
   </note>
   <barline location="right">
    <repeat direction="backward" times="99"/>
   </barline>
  </measure>
 </part>
</score-partwise>
`);
  },
};
</script>