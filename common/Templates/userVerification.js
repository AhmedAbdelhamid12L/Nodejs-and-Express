const templateUserVerification = (link) => {
  return `<div>
    <h1 style="
        color: brown; 
        background-color: burlywood; 
        text-align: center;"
    >
        From Node.js
    </h1>
    <div>
        <a href="${process.env.SERVERLINK}/${link}"
            style="
            padding: 1rem;
            color: #fff;
            background-color: darkslateblue;
            border-radius: 4px;
            text-decoration: none;
            display: block;
            text-align: center;
            "
        >
            Verifiy
        </a>
    </div>
  </div>`;
};

module.exports = templateUserVerification;
