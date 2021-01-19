import React from "react";
import PHONE from "../images/phoneBlack.png";
import EMAIL from "../images/emailBlack.png";
import ADDRESS from "../images/addressBlack.png";
import ARROWRIGHT from "../images/arrowRight.png";
import ARROWLEFT from "../images/arrowLeft.png";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

Font.register({
  family: "Nunito",
  src:
    "https://cdn.jsdelivr.net/npm/@expo-google-fonts/nunito@0.1.0/Nunito_700Bold.ttf",
});
Font.register({
  family: "ariel",
  src:
    "https://cdn.jsdelivr.net/npm/bpg-arial@1.0.0/fonts/bpg-arial-webfont.ttf",
});

const baseColor = "#248b6d";
const baseColor2 = "#f1d454";
const baseTextColor = "#171717";
const colorBlack = "#171717";

// Create styles
export const styles = StyleSheet.create({
  page: {
    width: "100%",
    fontFamily: "Nunito",
  },
  flexBox: {
    display: "flex",
    flexDirection: "row",
  },
  flexBoxWrapper: {
    paddingTop: 18,
    display: "flex",
    flexDirection: "row",
  },

  line: {
    width: "2px",
    minHeight: "115%",
    backgroundColor: colorBlack,
    marginRight: 8,
    marginTop: -1,
  },
  dotLineWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "10%",

    alignItems: "center",
  },
  section: {
    left: {
      width: "30%",
      minHeight: "100%",
      backgroundColor: baseColor,
      paddingRight: 30,
      paddingLeft: 15,
      paddingVertical: 25,
    },
    right: {
      width: "70%",
      backgroundColor: baseColor2,
      paddingHorizontal: 40,
      paddingVertical: 25,
    },
  },

  arrows: {
    arrowTop: { width: "15%", position: "absolute", right: "-1", top: "25" },
    arrowBottom: {
      width: "6.4%",
      position: "absolute",
      left: "-1",
      bottom: "26",
    },
  },

  dot: {
    big: {
      height: "10px",
      width: "10px",
      marginTop: 4,
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25,
      backgroundColor: colorBlack,
      marginRight: 8,
    },
    small: {
      height: "4px",
      width: "4px",
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25,
      backgroundColor: colorBlack,
      marginRight: 8,
    },
  },
  heading: {
    wrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: baseColor,
      paddingVertical: 5,
      paddingHorizontal: 10,
      width: "40%",
    },
    left: {
      fontSize: 13,
      color: colorBlack,
      paddingLeft: 5,
      paddingBottom: 5,
    },
    right: {
      fontSize: 15,
      color: colorBlack,
      paddingLeft: 5,
      paddingBottom: 5,
    },
  },
  icon: {
    address: {
      marginRight: 7,
      width: "7%",
    },
    email: {
      marginRight: 7,
      width: "7%",
    },
    phone: {
      marginRight: 7,
      width: "7%",
    },
  },

  basic: {
    wrapper: {},
    name: {
      fontSize: 25,
      color: baseTextColor,
    },
    proffesion: {
      fontSize: 15,
      paddingLeft: 3,
      paddingBottom: 3,
      color: baseColor,
    },
    pitch: {
      fontSize: 9.5,
      paddingLeft: 3,
      textAlign: "justify",
    },
  },
  contact: {
    wrapper: { paddingVertical: 10 },
    text: {
      fontSize: 8.9,
      fontFamily: "ariel",
      width: "88%",
    },
    flexBox: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 5,
      paddingHorizontal: 5,
    },
  },
  skills: {
    wrapper: {
      paddingTop: 15,
    },
    text: {
      paddingHorizontal: 5,
      fontSize: 8.9,
      fontFamily: "ariel",
      paddingVertical: 3,
    },
  },
  education: {
    wrapper: { width: "90%" },
    box: {
      marginTop: 8,
      paddingHorizontal: 15,
    },
    institue: {
      fontSize: 11,
      paddingBottom: 3,
    },
    course: { fontSize: 10, paddingBottom: 3 },
    date: { fontSize: 9.5, color: baseColor },
  },
  diploma: {
    wrapper: { width: "90%" },
    box: {
      marginTop: 8,
      paddingHorizontal: 15,
    },
    institue: {
      fontSize: 11,
      paddingBottom: 3,
    },
    course: { fontSize: 10, paddingBottom: 3 },
    date: { fontSize: 9.5, color: baseColor },
  },
  experience: {
    wrapper: {},
    repeat: { paddingHorizontal: 15, paddingTop: 10 },
    flexBox: {
      display: "flex",
      flexDirection: "row",
    },

    org: {
      fontSize: 11,
      paddingBottom: 3,
      width: "50%",
      paddingRight: 8,
    },
    position: { fontSize: 10, paddingBottom: 3, width: "50%", paddingLeft: 8 },
    date: { fontSize: 9, color: baseColor },

    workDetailWrapper: {
      paddingTop: 10,
      paddingLeft: 15,
    },
    workDetail: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    workDetailText: {
      fontSize: 8.5,
    },
  },
});

const Template6 = ({ resumeInfo }) => {
  const {
    firstname,
    lastname,
    contact_details,
    address,
    profession,
    discription,
    academic_qualification,
    experience,
    fresher,
    certificates_diplomas,
    skills,
  } = resumeInfo;
  return (
    <Document>
      <Page wrap size="A4" style={styles.page}>
        <View wrap style={styles.flexBox}>
          <View style={styles.section.left}>
            <Image fixed style={styles.arrows.arrowTop} source={ARROWRIGHT} />
            <View style={styles.contact.wrapper}>
              <Text style={styles.heading.left}>CONTACT</Text>
              <View style={styles.contact.flexBox}>
                <Image source={EMAIL} style={styles.icon.email} />
                <Text style={styles.contact.text}>{contact_details.email}</Text>
              </View>
              <View style={styles.contact.flexBox}>
                <Image source={PHONE} style={styles.icon.phone} />
                <Text style={styles.contact.text}>
                  {contact_details.mobile}
                </Text>
              </View>
              <View style={styles.contact.flexBox}>
                <Image source={ADDRESS} style={styles.icon.address} />
                <Text style={styles.contact.text}>
                  {address.line_1 +
                    " " +
                    address.line_2 +
                    " " +
                    address.line_3 +
                    " " +
                    address.city +
                    " " +
                    address.state}
                </Text>
              </View>
            </View>
            <View style={styles.skills.wrapper}>
              <Text style={styles.heading.left}>SKILLS</Text>
              {skills.map((data, index) => {
                return (
                  <Text key={index} style={styles.skills.text}>
                    {data.skill}{" "}
                  </Text>
                );
              })}
            </View>
          </View>
          <View style={styles.section.right}>
            <Image fixed style={styles.arrows.arrowBottom} source={ARROWLEFT} />
            <View style={styles.basic.wrapper}>
              <Text style={styles.basic.name}>
                {firstname + " " + lastname}
              </Text>
              <Text style={styles.basic.proffesion}>{profession}</Text>
              <Text style={styles.basic.pitch}>{discription}</Text>
            </View>
            {academic_qualification.length !== 0 && (
              <View style={styles.flexBoxWrapper}>
                <View style={styles.dotLineWrapper}>
                  <Text style={styles.dot.big}></Text>
                  <Text style={styles.line}></Text>
                </View>
                <View style={styles.education.wrapper}>
                  <Text style={styles.heading.right}>EDUCATION</Text>
                  {academic_qualification.map((qualification, index) => {
                    return (
                      <View
                        key={index}
                        style={styles.education.box}
                        wrap={false}
                      >
                        <Text style={styles.education.institue}>
                          {qualification.institute}
                        </Text>
                        <Text style={styles.education.course}>
                          {qualification.qualification_title}
                        </Text>

                        <Text style={styles.education.date}>
                          {qualification.passing_year}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
            {certificates_diplomas.length !== 0 && (
              <View style={styles.flexBoxWrapper}>
                <View style={styles.dotLineWrapper}>
                  <Text style={styles.dot.big}></Text>
                  <Text style={styles.line}></Text>
                </View>
                <View style={styles.diploma.wrapper}>
                  <Text style={styles.heading.right}>DIPLOMA/CERTIFICATE</Text>
                  {certificates_diplomas.map((dips, index) => {
                    return (
                      <View key={index} style={styles.diploma.box} wrap={false}>
                        <Text style={styles.diploma.institue}>
                          {dips.diploma_institute}
                        </Text>
                        <Text style={styles.diploma.course}>
                          {dips.diploma_title}
                        </Text>

                        <Text style={styles.diploma.date}>
                          {dips.date_of_completion}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}

            {!fresher && experience.length !== 0 && (
              <View style={styles.flexBoxWrapper}>
                <View style={styles.dotLineWrapper}>
                  <Text style={styles.dot.big}></Text>
                  <Text style={styles.line}></Text>
                </View>
                <View style={styles.experience.wrapper}>
                  <Text style={styles.heading.right}>EXPERIENCE</Text>
                  {experience.map((exp, index) => {
                    return (
                      <View
                        key={index}
                        style={styles.experience.repeat}
                        wrap={false}
                      >
                        <View style={styles.experience.flexBox}>
                          <Text style={styles.experience.org}>
                            {exp.organisation}
                          </Text>
                          <Text style={styles.experience.position}>
                            {exp.position}
                          </Text>
                        </View>
                        <Text style={styles.experience.date}>
                          {exp.joining_month +
                            ", " +
                            exp.joining_year +
                            " to " +
                            exp.leaving_month +
                            ", " +
                            exp.leaving_year}
                        </Text>
                        <View style={styles.experience.workDetailWrapper}>
                          {exp.work_details.map((data, index) => {
                            return (
                              <View
                                key={index}
                                style={styles.experience.workDetail}
                              >
                                <View style={styles.dot.small}></View>
                                <Text style={styles.experience.workDetailText}>
                                  {data.workDetail}
                                </Text>
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Template6;
