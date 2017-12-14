module.exports = function(sequelize, DataTypes) {
  var Washington = sequelize.define("Washington_state_data", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    county: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.FLOAT
    },
    long: {
      type: DataTypes.FLOAT
    },
    fips_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
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
      type: DataTypes.FLOAT,
      allowNull: false
    },
    male_reg_pop_pct: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    total_reg_pop_pct: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    female_turnout_pop_pct: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    male_turnout_pop_pct: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    total_turnout_pop_pct: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    female_turnout_reg_pct: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    male_turnout_reg_pct: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    total_turout_reg_pct: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

  return Washington;
};
