import React from "react";
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

const styles = StyleSheet.create({
  page: {
    paddingVertical: 25,
    paddingHorizontal: 25,
  },
  name: {
    fontSize: 25,
    color: "black",
    fontFamily: "Nunito",
    fontWeight: 700,
    padding: 0,
    margin: 0,
  },
  profession: {
    paddingLeft: 5,
    fontSize: 13,
    color: "gray",
    fontFamily: "Nunito",
    fontWeight: 700,
    marginBottom: 3,
  },
  discription: {
    paddingLeft: 5,
    fontSize: 9,
    color: "black",
    fontFamily: "Nunito",
    fontWeight: 400,
    textAlign: "justify",
    marginBottom: 6,
  },
  contact: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderBottom: 2,
    borderTop: 2,
    borderColor: "gray",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  contact_details: {
    textAlign: "justify",
    maxWidth: "30%",
    minWidth: "30%",
    fontSize: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  contactImage: {
    marginRight: 5,
    width: "7%",
    height: "5%",
  },
  heading: {
    marginTop: 15,
    marginBottom: 3,
    fontSize: 20,
    fontFamily: "Nunito",
  },
  fresher: {
    fontSize: 13,
    fontFamily: "Nunito",
    paddingLeft: 5,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },

  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginVertical: 5,
    fontSize: 10,
  },
  tableCellHead: {
    margin: "auto",
    marginVertical: 5,
    fontSize: 10,
    fontFamily: "Nunito",
  },

  list_dots: {
    backgroundColor: "#000",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    width: "5px",
    height: "5px",
    paddingTop: "2px",
    marginRight: "8px",
  },

  skills: {
    fontSize: 10,
    width: "33.3%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 8,
  },
  skillFlex: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
const Template1 = ({ resumeInfo }) => {
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
        <View style={styles.name}>
          <Text>{firstname + " " + lastname}</Text>
        </View>
        <View style={styles.profession}>
          <Text>{profession}</Text>
        </View>
        <View style={styles.discription}>
          <Text>{discription}</Text>
        </View>
        <View style={styles.contact}>
          <View style={styles.contact_details}>
            <Image
              source="https://img.icons8.com/fluent-systems-filled/24/000000/phone.png"
              style={styles.contactImage}
            />
            <Text>{contact_details.mobile}</Text>
          </View>
          <View style={styles.contact_details}>
            <Image
              source="https://img.icons8.com/material-rounded/24/000000/important-mail.png"
              style={styles.contactImage}
            />
            <Text>{contact_details.email}</Text>
          </View>
          <View style={styles.contact_details}>
            <Image
              source="https://img.icons8.com/material/26/000000/worldwide-location.png"
              style={styles.contactImage}
            />
            <Text>
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
        <View style={styles.heading}>
          <Text>Experience</Text>
        </View>
        {fresher ? (
          <View style={styles.fresher}>
            <Text>Fresher</Text>
          </View>
        ) : (
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHead}>Organisation</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHead}>Postition</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHead}>Joining Date</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHead}>Leaving Date</Text>
              </View>
            </View>
            {experience.map((exp, index) => {
              return (
                <View key={index} style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{exp.organisation}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{exp.position}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {exp.joining_month + ", " + exp.joining_year}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {exp.leaving_month + ", " + exp.leaving_year}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}
        <View style={styles.heading}>
          <Text>Education</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHead}>Qualification</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHead}>School/College</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHead}>Board/University</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHead}>Year Of Passing</Text>
            </View>
          </View>
          {academic_qualification.map((qualification, index) => {
            return (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {qualification.qualification_title}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {qualification.institute}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{qualification.board}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {qualification.passing_year}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <View style={styles.heading}>
          <Text>Diploma/Certificates</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHead}>Course title</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHead}>Institute</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHead}>
                Course Duration (in months)
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHead}>Date Of Completion</Text>
            </View>
          </View>
          {certificates_diplomas.map((dips, index) => {
            return (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{dips.diploma_title}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{dips.diploma_institute}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{dips.course_duration}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {dips.date_of_completion}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <View style={styles.heading}>
          <Text>Skills</Text>
        </View>
        <View style={styles.skillFlex}>
          {skills.map((data, index) => {
            return (
              <View key={index} style={styles.skills} wrap={false}>
                <View>
                  <Text style={styles.list_dots}></Text>
                </View>
                <View>
                  <Text>{data.skill}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

export default Template1;
