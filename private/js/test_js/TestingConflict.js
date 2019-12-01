function numberOfConflict(mania, manib) {
  ssmallfilelist = [];
  sfilelist = [];
  sfolderlist = [];
  const sinfolder = [];

  for (let prop in mania.structure) {
    var structure = mania.structure[prop];
    //console.log(mania.structure[prop]);
    sfilelist.push(mania.structure[prop]);
    filename = structure.artifactNode;
    ssmallfilelist.push(filename);
    console.log(structure);
    foldername = structure.artifactRelPath;
    sinfolder.push(foldername) ;

    var tar = filename.lastIndexOf("/");
    var file = filename.substring(0, tar);
    sfolderlist.push(file);
  }
  //console.log(ssmallfilelist, sfolderlist);

  //manib = target manifest json object;
  tsmallfilelist = [];
  tfilelist = [];
  tfolderlist = [];
  const tinfolder = [];

  for (let prop in manib.structure) {
    var structure = manib.structure[prop];
    tfilelist.push(manib.structure[prop]);
    //console.log(structure.artifactNode, structure.artifactAbsPath);
    filename = structure.artifactNode;
    tsmallfilelist.push(filename);
    foldername = structure.artifactRelPath;
    tinfolder.push(foldername) ;

    var tar = filename.lastIndexOf("/");
    var file = filename.substring(0, tar);
    tfolderlist.push(file);
  }
  //console.log(tsmallfilelist, tfolderlist);

  var conflict = 0;

  var data = [];
  for (const [key, value] of Object.entries(sfolderlist)) {
    var tkey = tfolderlist.indexOf(value);

    //if (tsmallfilelist[tkey] == ssmallfilelist[key]) {
    if (
      tsmallfilelist[tkey] != ssmallfilelist[key] &&
      tinfolder[tkey] == sinfolder[key] &&

      key in ssmallfilelist &&
      tkey in tsmallfilelist
    ) {
      //console.log(sfilelist[key], tfilelist[tkey]);
      console.log(sinfolder);
      data.push({
        source: sfilelist[key],
        target: tfilelist[tkey]
      });

      conflict++;
    }
  }
  // console.log(data);
  var json = {
    conflict: conflict,
    conflictFiles: data
  };
  //console.log(data);
  //console.log(json);

  // return json;
  return data;
}

const mani = {
  user: "dennis2",
  repo: "py2",
  structure: [
    {
      artifactNode: "multithread.py/414120-L7.py",
      artifactAbsPath: "py2/"
    },
    { artifactNode: "compare.py/671902-L1215.py", artifactAbsPath: "py2/" }
  ],
  command: "checkin",
  id: 3,
  datetime: "2019-11-07T23:08:56.408Z"
};

const manifest1 = {
  user: "Alice",
  repo: "ProjectX",
  structure: [
    { artifactNode: "data.txt/7590-L11.txt", artifactRelPath: "" },
    { artifactNode: "string.txt/6464-A22.txt", artifactRelPath: "py1" },
    {
      artifactNode: "document.txt/9999-A00.txt",
      artifactRelPath: ""
    },
    {
      artifactNode: "pdf.txt/7424-B12.txt",
      artifactRelPath: ""
    }
  ],
  parent: [1574636514339],
  command: "check-in",
  datetime: "2019-11-24T23:01:54.344Z",
  id: 1574636514344
};

const manifest2 = {
  user: "Alice",
  repo: "ProjectX",
  structure: [
    { artifactNode: "data.txt/7590-L11.txt", artifactRelPath: "" },
    {
      artifactNode: "string.txt/9999-A00.txt",
      artifactRelPath: "py2"
    },
    { artifactNode: "json.txt/9999-A00.txt", artifactRelPath: "" },
    { artifactNode: "html.txt/3333-A55.txt", artifactRelPath: "" }
  ],
  parent: [1574636514339],
  command: "check-in",
  datetime: "2019-11-24T23:01:54.344Z",
  id: 1574636514344
};

// console.log(numberOfConflict(mani, mani));
// console.log(numberOfConflict(manifest1, manifest1));
console.log(numberOfConflict(manifest1, manifest2));
