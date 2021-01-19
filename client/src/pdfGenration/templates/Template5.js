import React from "react";
import PHONE from "../images/phonePink.png";
import EMAIL from "../images/emailPink.png";
import ADDRESS from "../images/addressPink.png";
import EDU from "../images/educationWhite.png";
import INFO from "../images/personalInfoWhite.png";
import EXP from "../images/suitcaseWhite.png";
import DIPLOMA from "../images/diplomaWhite.png";
import SKILL from "../images/skillWhite.png";
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

const baseColor = "#f4224b";
const baseTextColor = "#202828";
const colorWhite = "#ffffff";

// Create styles
const styles = StyleSheet.create({
  page: {
    width: "100%",
    fontFamily: "Nunito",
    paddingHorizontal: 20,
    paddingVertical: 20,
    color: baseTextColor,
  },
  wrapper: {
    minHeight: "100%",
    width: "100%",
    border: 3,
    borderColor: baseColor,
  },
  header: {
    width: "101%",
    position: "relative",
    left: -2.7,
    minHeight: "120px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottom: 5,
    borderBottomColor: baseColor,
  },
  contentWrapper: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },

  dot: {
    height: "4px",
    width: "4px",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: baseColor,
    marginRight: 8,
  },
  heading: {
    wrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: 15,
      backgroundColor: baseColor,
      paddingVertical: 5,
      paddingHorizontal: 10,
      width: "40%",
    },
    text: {
      fontSize: 12,
      color: colorWhite,
    },
  },
  icon: {
    address: {
      marginRight: 7,
      width: "4%",
    },
    email: {
      marginRight: 7,
      width: "3%",
    },
    phone: {
      marginRight: 7,
      width: "3%",
    },
    info: {
      marginRight: 7,
      width: "9%",
    },
    edu: {
      marginRight: 7,
      width: "9%",
    },
    dip: {
      marginRight: 7,
      width: "9%",
    },
    exp: {
      marginRight: 7,
      width: "9%",
    },
    skill: { marginRight: 7, width: "9%" },
  },

  basic: {
    wrapper: {
      width: "40%",
      paddingLeft: 25,
    },
    name: {
      fontSize: 25,
      color: baseTextColor,
    },
    proffesion: {
      fontSize: 15,
      paddingLeft: 3,
      marginVertical: 2,
      color: baseColor,
    },
    pitch: {
      fontSize: 9.5,
      paddingLeft: 3,
      textAlign: "justify",
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    pitchWrapper: {},
  },
  contact: {
    wrapper: {
      width: "60%",
      display: "flex",
      alignItems: "center",
    },
    text: {
      fontSize: 9,
      width: "50%",
    },
    flexBox: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 5,
      paddingHorizontal: 5,
    },
  },
  education: {
    wrapper: {},
    flexBox: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 13,
      paddingHorizontal: 15,
    },
    institue: {
      fontSize: 9.5,
      width: "40%",
      marginHorizontal: 20,
      textAlign: "center",
      paddingBottom: 5,
      borderBottom: 1,
      borderBottomColor: baseColor,
    },
    course: { fontSize: 9.5, width: "25%" },
    date: { fontSize: 9.5, width: "25%", color: baseColor },
  },
  diploma: {
    wrapper: { paddingTop: 13 },
    flexBox: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 15,
      paddingTop: 13,
    },
    institue: {
      fontSize: 9.5,
      width: "40%",
      marginHorizontal: 20,
      textAlign: "center",
      paddingBottom: 5,
      borderBottom: 1,
      borderBottomColor: baseColor,
    },
    course: { fontSize: 9.5, width: "25%" },
    date: { fontSize: 9.5, width: "25%", color: baseColor },
  },
  experience: {
    repeat: {},
    wrapper: { paddingTop: 13 },
    flexBox: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 15,
      paddingTop: 13,
    },
    org: {
      fontSize: 9.5,
      width: "40%",
    },
    position: { fontSize: 9.5, width: "25%", marginHorizontal: 20 },
    dateWrapper: { width: "25%" },
    date: { fontSize: 9.5, color: baseColor },
    to: {
      fontSize: 9,
      paddingLeft: 30,
    },
    workDetailWrapper: {
      paddingLeft: 25,
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

  skills: {
    wrapper: {
      paddingTop: 13,
    },
    text: {
      fontSize: 9.5,
      paddingHorizontal: 15,
      paddingTop: 13,
    },
  },
});

const Template5 = ({ resumeInfo }) => {
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
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <View style={styles.basic.wrapper}>
              <Text style={styles.basic.name}>
                {firstname + " " + lastname}
              </Text>
              <Text style={styles.basic.proffesion}>{profession}</Text>
            </View>
            <View style={styles.contact.wrapper}>
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
          </View>
          <View style={styles.contentWrapper}>
            <View style={styles.basic.pitchWrapper}>
              <View style={styles.heading.wrapper}>
                <Image source={INFO} style={styles.icon.info} />
                <Text style={styles.heading.text}>Personal Summary</Text>
              </View>
              <Text style={styles.basic.pitch}>{discription}</Text>
            </View>
            <View style={styles.education.wrapper}>
              <View style={styles.heading.wrapper}>
                <Image source={EDU} style={styles.icon.edu} />
                <Text style={styles.heading.text}>Education</Text>
              </View>
              {academic_qualification.map((qualification, index) => {
                return (
                  <View
                    key={index}
                    style={styles.education.flexBox}
                    wrap={false}
                  >
                    <Text style={styles.education.course}>
                      {qualification.qualification_title}
                    </Text>
                    <Text style={styles.education.institue}>
                      {qualification.institute}
                    </Text>
                    <Text style={styles.education.date}>
                      {qualification.passing_year}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.diploma.wrapper}>
              <View style={styles.heading.wrapper}>
                <Image source={DIPLOMA} style={styles.icon.dip} />
                <Text style={styles.heading.text}>Diploma/Certificates</Text>
              </View>
              {certificates_diplomas.map((dips, index) => {
                return (
                  <View key={index} style={styles.diploma.flexBox} wrap={false}>
                    <Text style={styles.diploma.course}>
                      {dips.diploma_title}
                    </Text>
                    <Text style={styles.diploma.institue}>
                      {dips.diploma_institute}
                    </Text>
                    <Text style={styles.diploma.date}>
                      {dips.date_of_completion}
                    </Text>
                  </View>
                );
              })}
            </View>
            {!fresher && experience.length !== 0 && (
              <View style={styles.experience.wrapper}>
                <View style={styles.heading.wrapper} wrap={false}>
                  <Image source={EXP} style={styles.icon.exp} />
                  <Text style={styles.heading.text}>Experience</Text>
                </View>
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

                        <View style={styles.experience.dateWrapper}>
                          <Text style={styles.experience.date}>
                            {exp.joining_month + ", " + exp.joining_year}
                          </Text>
                          <Text style={styles.experience.to}>to</Text>
                          <Text style={styles.experience.date}>
                            {exp.leaving_month + ", " + exp.leaving_year}
                          </Text>
                        </View>
                      </View>
                      {exp.work_details.map((data, index) => {
                        return (
                          <View
                            key={index}
                            style={styles.experience.workDetailWrapper}
                          >
                            <View style={styles.experience.workDetail}>
                              <View style={styles.dot}></View>
                              <Text style={styles.experience.workDetailText}>
                                {data.workDetail}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  );
                })}
              </View>
            )}

            <View style={styles.skills.wrapper}>
              <View style={styles.heading.wrapper} wrap={false}>
                <Image source={SKILL} style={styles.icon.skill} />
                <Text style={styles.heading.text}>Skills</Text>
              </View>

              <Text style={styles.skills.text}>
                {skills.map((data) => {
                  return data.skill + ",  ";
                })}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Template5;
