import React from "react";
import PHONE from "../images/phone.png";
import EMAIL from "../images/email.png";
import ADDRESS from "../images/address.png";
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
    paddingVertical: 20,
  },
  basic: {
    width: "100%",
    minHeight: "50px",
    backgroundColor: "#1d222b",
    paddingVertical: 10,
    paddingHorizontal: 25,
    display: "flex",
    flexDirection: "row",
    color: "#fff",
    paddingBottom: 12,
    marginTop: -20,
  },
  basicInfo: {
    width: "50%",
  },
  contactInfo: {
    width: "50%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingLeft: 135,
  },
  name: {
    paddingBottom: 5,
    fontSize: 20,
  },
  profession: {
    fontSize: 14,
    paddingLeft: 3,
    paddingBottom: 5,
    color: "#ff5722",
  },
  pitch: {
    fontSize: 10,
    paddingHorizontal: 4,
    textAlign: "justify",
  },

  contactFlex: {
    fontSize: 10,
    paddingVertical: 3,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    address: {
      marginLeft: 3,
      width: "9%",
      height: "30%",
    },
    email: {
      marginLeft: 7,
      width: "8%",
      height: "80%",
    },
    phone: {
      marginLeft: 7,
      width: "7%",
      height: "78%",
    },
  },
  wrapper: {
    paddingHorizontal: 25,
    paddingVertical: 18,
  },
  blockHeading: {
    color: "#ff5722",
  },
  headingLine: {
    flex: 1,
    marginLeft: 3,
    borderBottom: 1.5,
    width: "auto",
    fontSize: 8,
    color: "#fff",
    borderBottomColor: "#ff5722",
  },
  flexBox: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  skills: {
    wrapper: {},
    flexBox: {
      paddingVertical: 5,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
    },
    skill: {
      backgroundColor: "#c62828",
      color: "#fff",
      fontSize: 10,
      marginHorizontal: 5,
      marginVertical: 3,
      paddingVertical: 3,
      paddingHorizontal: 6,
      borderRadius: 3,
    },
  },

  experience: {
    wrapper: {
      marginVertical: 10,
    },
    box: { paddingVertical: 6, paddingHorizontal: 6 },
    fresher: {
      color: "#c62828",
      fontSize: 12,
    },
    flexBox: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
    },
    org: { fontSize: 10, width: "60%" },
    profession: { fontSize: 12 },
    dates: { width: "40%", color: "#ff5722", fontSize: 8, textAlign: "center" },
  },
  education: {
    wrapper: {},
    box: { paddingVertical: 6, paddingHorizontal: 6 },
    course: { fontSize: 12 },
    institute: {
      fontSize: 10,
    },
    dates: {
      fontSize: 9,
      color: "#ff5722",
    },
  },
  diploma: {
    wrapper: { paddingVertical: 7 },
    box: { paddingVertical: 6, paddingHorizontal: 6 },
    course: { fontSize: 12 },
    institute: {
      fontSize: 10,
    },
    dates: {
      fontSize: 9,
      color: "#ff5722",
    },
  },
});

// Create Document Component
const Template2 = ({ resumeInfo }) => {
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
        <View style={styles.basic}>
          <View style={styles.basicInfo}>
            <Text style={styles.name}>{firstname + " " + lastname}</Text>
            <Text style={styles.profession}>{profession}</Text>
            <Text style={styles.pitch}>{discription}</Text>
          </View>
          <View style={styles.contactInfo}>
            <View style={styles.contactFlex}>
              <Text style={styles.email}>{contact_details.email}</Text>
              <Image source={EMAIL} style={styles.icon.email} />
            </View>
            <View style={styles.contactFlex}>
              <Text style={styles.mobile}>{contact_details.mobile}</Text>
              <Image source={PHONE} style={styles.icon.phone} />
            </View>
            <View style={styles.contactFlex}>
              <Text style={styles.address}>
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
              <Image source={ADDRESS} style={styles.icon.address} />
            </View>
          </View>
        </View>
        <View style={styles.wrapper}>
          {skills.length !== 0 ? (
            <View style={styles.skills.wrapper}>
              <View style={styles.flexBox}>
                <Text style={styles.blockHeading}>Skills</Text>
                <Text style={styles.headingLine}>ss</Text>
              </View>

              <View style={styles.skills.flexBox}>
                {skills.map((data, index) => {
                  return (
                    <Text key={index} style={styles.skills.skill}>
                      {data.skill}
                    </Text>
                  );
                })}
              </View>
            </View>
          ) : (
            <View style={styles.skills.wrapper}></View>
          )}

          <View style={styles.experience.wrapper}>
            <View style={styles.flexBox}>
              <Text style={styles.blockHeading}>Experience</Text>
              <Text style={styles.headingLine}>ss</Text>
            </View>
            {fresher ? (
              <View style={styles.experience.box} wrap={false}>
                <Text style={styles.experience.fresher}>Fresher</Text>
              </View>
            ) : (
              experience.map((exp, index) => {
                return (
                  <View key={index} style={styles.experience.box} wrap={false}>
                    <Text style={styles.experience.profession}>
                      {exp.position}
                    </Text>
                    <View style={styles.experience.flexBox}>
                      <Text style={styles.experience.org}>
                        {exp.organisation}
                      </Text>
                      <Text style={styles.experience.dates}>
                        {exp.joining_month +
                          ", " +
                          exp.joining_year +
                          " - " +
                          exp.leaving_month +
                          ", " +
                          exp.leaving_year}
                      </Text>
                    </View>
                  </View>
                );
              })
            )}
          </View>
          <View style={styles.education.wrapper}>
            <View style={styles.flexBox}>
              <Text style={styles.blockHeading}>Education</Text>
              <Text style={styles.headingLine}>ss</Text>
            </View>
            {academic_qualification.map((qualification, index) => {
              return (
                <View key={index} style={styles.education.box} wrap={false}>
                  <Text style={styles.education.course}>
                    {qualification.qualification_title}
                  </Text>
                  <Text style={styles.education.institute}>
                    {qualification.institute}
                  </Text>
                  <Text style={styles.education.dates}>
                    {qualification.passing_year}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.diploma.wrapper}>
            <View style={styles.flexBox}>
              <Text style={styles.blockHeading}>Diploma/Certificates</Text>
              <Text style={styles.headingLine}>ss</Text>
            </View>
            {certificates_diplomas.map((dips, index) => {
              return (
                <View style={styles.diploma.box} wrap={false}>
                  <Text style={styles.diploma.course}>
                    {dips.diploma_title}
                  </Text>
                  <Text style={styles.diploma.institute}>
                    {dips.diploma_institute}
                  </Text>
                  <Text style={styles.diploma.dates}>
                    {dips.date_of_completion}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Template2;
