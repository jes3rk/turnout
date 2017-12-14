module.exports = function(sequelize, DataTypes) {
  var Washington = sequelize.define("Washington_state_data", {
    county: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    total_elig_pop: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_regis_pop: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    female_ballots_cast: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    male_ballots_cast: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_ballots_cast: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    female_reg_pop_pct: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    male_reg_pop_pct: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    total_reg_pop_pct: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    female_turnout_pop_pct: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    male_turnout_pop_pct: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    total_turnout_pop_pct: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    female_turnout_reg_pct: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    male_turnout_reg_pct: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    total_turnout_reg_pct: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      // allowNull: false,
      primaryKey: true
    },
    lat: {
      type: DataTypes.TEXT
    },
    long: {
      type: DataTypes.TEXT
    },
    fips_code: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, { timestamps: false });

  return Washington;
};
