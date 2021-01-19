import React from "react";
import PHONE from "../images/phoneBlack.png";
import EMAIL from "../images/emailBlack.png";
import ADDRESS from "../images/addressBlack.png";
import EDU from "../images/educationDarkBlue.png";
import EXP from "../images/suitcaseDarkBlue.png";
import DIPLOMA from "../images/diplomaDarkBlue.png";
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

// Create styles
const styles = StyleSheet.create({
  page: {
    width: "100%",
    fontFamily: "Nunito",
    paddingVertical: 25,
    paddingHorizontal: 15,
    color: "#323232",
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
  },
  flexBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    height: "5px",
    width: "5px",
    backgroundColor: "#000",
    marginRight: 8,
  },
  section: {
    left: { width: "30%" },
    right: {
      width: "70%",
      paddingLeft: 20,
    },
  },
  heading: {
    cap: {
      fontSize: 12,
      backgroundColor: "#012c4f",
      marginBottom: 3,
      color: "#fff",
      paddingVertical: 3,
      paddingHorizontal: 5,
    },
    nor: {
      fontSize: 15,
      color: "#012c4f",
      borderBottom: 2,
      borderBottomColor: "#102231",
      flex: 1,
    },
    icon: {
      edu: {
        width: "6%",
        marginRight: 5,
      },
    },
  },

  basic: {
    wrapper: {},
    name: {
      fontSize: 18,
      color: "#012c4f",
    },
    proffesion: {
      fontSize: 13,
      paddingLeft: 3,
      marginVertical: 2,
      color: "#d7010d",
    },
    pitch: {
      fontSize: 9,
      paddingLeft: 3,

      textAlign: "justify",
    },
  },
  contact: {
    wrapper: {
      marginVertical: 15,
    },
    text: {
      fontSize: 9,

      width: "75%",
    },
    flexBox: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 5,
      paddingHorizontal: 5,
    },
  },
  icon: {
    address: {
      marginRight: 7,
      width: "6%",
    },
    email: {
      marginRight: 7,
      width: "6%",
    },
    phone: {
      marginRight: 7,
      width: "6%",
    },
  },
  skills: {
    wrapper: {},
    flexBox: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 5,
    },
    left: {
      width: "30%",
    },
    right: {
      width: "70%",
      marginHorizontal: 5,
    },
    text: { fontSize: 9, color: "#323232" },
    barBorder: {
      width: "90%",
      height: "4px",
      backgroundColor: "#cccccc",
    },
  },
  education: {
    wrapper: { paddingBottom: 20 },
    flexBox: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 10,
      paddingLeft: 15,
    },
    institue: { fontSize: 11, color: "#012c4f" },
    course: { fontSize: 9.5, color: "#d7010d" },
    date: { fontSize: 10, color: "#d7010d" },
    left: { width: "80%", paddingRight: 20 },
    right: { width: "20%" },
  },
  experience: {
    wrapper: { paddingBottom: 20 },
    flexBox: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 10,
      paddingLeft: 15,
    },
    org: { fontSize: 11, color: "#012c4f" },
    position: { fontSize: 9.5, color: "#d7010d" },
    date: { fontSize: 9, color: "#d7010d" },
    left: { width: "70%", paddingRight: 20 },
    right: { width: "30%" },
    box: {},
    to: {
      fontSize: 9,
      paddingLeft: 35,
    },
    workDetailsBox: {
      paddingLeft: 20,
      paddingRight: 80,
    },
    workDetail: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    workDetailText: {
      fontSize: 10,
    },
    fresher: {
      fontSize: 11,
      color: "#d7010d",
      paddingLeft: 20,
      paddingTop: 10,
    },
  },
  diploma: {
    wrapper: { paddingBottom: 20 },
    flexBox: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 10,
      paddingLeft: 15,
    },
    institue: { fontSize: 11, color: "#012c4f" },
    course: { fontSize: 9.5, color: "#d7010d" },
    date: { fontSize: 9, color: "#d7010d" },
    left: { width: "70%", paddingRight: 20 },
    right: { width: "30%" },
  },
});

const Template3 = ({ resumeInfo }) => {
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
      <Page style={styles.page}>
        <View style={styles.wrapper}>
          <View style={styles.section.left}>
            <View style={styles.basic.wrapper}>
              <Text style={styles.basic.name}>
                {firstname + " " + lastname}
              </Text>
              <Text style={styles.basic.proffesion}>{profession}</Text>
              <Text style={styles.basic.pitch}>{discription}</Text>
            </View>
            <View style={styles.contact.wrapper}>
              <Text style={styles.heading.cap}>Contact</Text>
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
              <Text style={styles.heading.cap}>Skills</Text>
              {skills.map((data, index) => {
                return (
                  <View key={index} style={styles.skills.flexBox}>
                    <View style={styles.skills.left}>
                      <Text style={styles.skills.text}>{data.skill} :</Text>
                    </View>
                    <View style={styles.skills.right}>
                      <View style={styles.skills.barBorder}>
                        <View
                          style={{
                            width: `${data.skill_level}%`,
                            height: "100%",
                            backgroundColor: "#012c4f",
                          }}
                        ></View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styles.section.right}>
            <View style={styles.education.wrapper}>
              <View style={styles.flexBox}>
                <Image source={EDU} style={styles.heading.icon.edu} />
                <Text style={styles.heading.nor}>Education</Text>
              </View>
              {academic_qualification.map((qualification, index) => {
                return (
                  <View key={index} style={styles.education.flexBox}>
                    <View style={styles.education.left}>
                      <Text style={styles.education.institue}>
                        {qualification.institute}
                      </Text>
                      <Text style={styles.education.course}>
                        {qualification.qualification_title}
                      </Text>
                    </View>
                    <View style={styles.education.right}>
                      <Text style={styles.education.date}>
                        {qualification.passing_year}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
            <View style={styles.diploma.wrapper}>
              <View style={styles.flexBox}>
                <Image source={DIPLOMA} style={styles.heading.icon.edu} />
                <Text style={styles.heading.nor}>Diploma/Certificate</Text>
              </View>
              {certificates_diplomas.map((dips, index) => {
                return (
                  <View style={styles.diploma.flexBox}>
                    <View style={styles.diploma.left}>
                      <Text style={styles.diploma.institue}>
                        {dips.diploma_institute}
                      </Text>
                      <Text style={styles.diploma.course}>
                        {dips.diploma_title}
                      </Text>
                    </View>
                    <View style={styles.diploma.right}>
                      <Text style={styles.diploma.date}>
                        {dips.date_of_completion}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
            <View style={styles.experience.wrapper}>
              <View style={styles.flexBox}>
                <Image source={EXP} style={styles.heading.icon.edu} />
                <Text style={styles.heading.nor}>Experience</Text>
              </View>
              {fresher ? (
                <Text style={styles.experience.fresher}>Fresher</Text>
              ) : (
                experience.map((exp, index) => {
                  return (
                    <View style={styles.experience.box}>
                      <View style={styles.experience.flexBox}>
                        <View style={styles.experience.left}>
                          <Text style={styles.experience.org}>
                            {exp.organisation}
                          </Text>
                          <Text style={styles.experience.position}>
                            {exp.position}
                          </Text>
                        </View>
                        <View style={styles.experience.right}>
                          <Text style={styles.experience.date}>
                            {exp.joining_month + ", " + exp.joining_year}
                          </Text>
                          <Text style={styles.experience.to}>to</Text>
                          <Text style={styles.experience.date}>
                            {exp.leaving_month + ", " + exp.leaving_year}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.experience.workDetailsBox}>
                        {exp.work_details.map((data, index) => {
                          return (
                            <View style={styles.experience.workDetail}>
                              <View style={styles.dot}></View>
                              <Text style={styles.experience.workDetailText}>
                                {data.workDetail}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  );
                })
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Template3;
