# Parameter Sample Raw Copy

Raw sample copied as provided.

```tsv
name	unit	type	value	year	scope	version	source	comment
electricity	kgCO2e/kWh	specific	0.5193	2019	2
electricity	kgCO2e/kWh	specific	0.5196	2020	2
petrol	kgCO2e/L	specific	2.3505		1
diesel	kgCO2e/L	specific	2.6906		1
naturalGas	kgCO2e/Nm3	specific	2.1420		1


GWP_CH4	g CO2e/ g CH4	global	25
GWP_N2O	g CO2e/ g N2O	global	298
composting_CH4_greenWaste	g CH4 / kg	global	4				IPCC
composting_N2O_greenWaste	g N2O / kg	global	0.3				IPCC
tree_olive_young_biomass	kg / wood / year	specific	38.0000				IPCC
tree_olive_adult_biomass	kg / wood / year	specific	69.0000				IPCC
tree_olive_senescent _biomass	kg / wood / year	specific	161.6667				IPCC
tree_broadleaf_rootToShoot	%	global	46%				IPCC Table 4.4	fallback to any broadleaf
tree_olive_rootToShoot	%	specific	50%				IPCC
dryMatter_carbonFrac	%	global	47%				IPCC
manure_dairyCattle_CH4	kgCH4/head/year	specific	99.5646		1		IRE Sfax	direct emissions + manure management
manure_otherCattle_CH4	kgCH4/head/year	specific	61.7884		1		IRE Sfax	direct emissions + manure management
manure_sheep_CH4	kgCH4/head/year	specific	5.3561		1		IRE Sfax	direct emissions + manure management
manure_goats_CH4	kgCH4/head/year	specific	5.3894		1		IRE Sfax	direct emissions + manure management
manure_horses_CH4	kgCH4/head/year	specific	19.6404		1		IRE Sfax	direct emissions + manure management
manure_donkeysMules_CH4	kgCH4/head/year	specific	10.8965		1		IRE Sfax	direct emissions + manure management
manure_camels_CH4	kgCH4/head/year	specific	47.9181		1		IRE Sfax	direct emissions + manure management
manure_broilers_CH4	kgCH4/head/year	specific	0.0132		1		IRE Sfax	direct emissions + manure management
manure_layingHens_CH4	kgCH4/head/year	specific	0.0286		1		IRE Sfax	direct emissions + manure management
manure_turkeys_CH4	kgCH4/head/year	specific	0.0924		1		IRE Sfax
NE_dairyCattle_N2O	kgN2O/head/year	specific	1.1041		1		IRE Sfax
NE_otherCattle_N2O	kgN2O/head/year	specific	0.7849		1		IRE Sfax
NE_sheep_N2O	kgN2O/head/year	specific	0.1879		1		IRE Sfax
NE_goats_N2O	kgN2O/head/year	specific	0.2357		1		IRE Sfax
NE_horses_N2O	kgN2O/head/year	specific	0.6279		1		IRE Sfax
NE_donkeysMules_N2O	kgN2O/head/year	specific	0.3430		1		IRE Sfax
NE_camels_N2O	kgN2O/head/year	specific	0.5725		1		IRE Sfax
NE_broilers_N2O	kgN2O/head/year	specific	0.0057		1		IRE Sfax
NE_layingHens_N2O	kgN2O/head/year	specific	0.0085		1		IRE Sfax
NE_turkeys_N2O	kgN2O/head/year	specific	0.0289		1		IRE Sfax
ExcRate_dairyCattle_N2O	kgN2O/head/year	specific	1.1041		1		IRE Sfax	annual axcreation rate
ExcRate_otherCattle_N2O	kgN2O/head/year	specific	0.7849		1		IRE Sfax	annual axcreation rate
ExcRate_sheep_N2O	kgN2O/head/year	specific	0.1879		1		IRE Sfax	annual axcreation rate
ExcRate_goats_N2O	kgN2O/head/year	specific	0.2357		1		IRE Sfax	annual axcreation rate
ExcRate_horses_N2O	kgN2O/head/year	specific	0.6279		1		IRE Sfax	annual axcreation rate
ExcRate_donkeysMules_N2O	kgN2O/head/year	specific	0.3430		1		IRE Sfax	annual axcreation rate
ExcRate_camels_N2O	kgN2O/head/year	specific	0.5725		1		IRE Sfax	annual axcreation rate
ExcRate_broilers_N2O	kgN2O/head/year	specific	0.0057		1		IRE Sfax	annual axcreation rate
ExcRate_layingHens_N2O	kgN2O/head/year	specific	0.0085		1		IRE Sfax	annual axcreation rate
ExcRate_turkeys_N2O	kgN2O/head/year	specific	0.0289		1		IRE Sfax	annual axcreation rate
confinedTimeShare_dairyCattle	%	global	100%				IRE Sfax	time % which animal stays at the stable
confinedTimeShare_otherCattle	%	global	75%				IRE Sfax	time % which animal stays at the stable
confinedTimeShare_sheep	%	global	80%				IRE Sfax	time % which animal stays at the stable
confinedTimeShare_goats	%	global	80%				IRE Sfax	time % which animal stays at the stable
confinedTimeShare_horses	%	global	0%				IRE Sfax	time % which animal stays at the stable
confinedTimeShare_donkeysMules	%	global	0%				IRE Sfax	time % which animal stays at the stable
confinedTimeShare_camels	%	global	0%				IRE Sfax	time % which animal stays at the stable
confinedTimeShare_broilers	%	global	75%				IRE Sfax	time % which animal stays at the stable
confinedTimeShare_layingHens	%	global	100%				IRE Sfax	time % which animal stays at the stable
confinedTimeShare_turkeys	%	global	100%				IRE Sfax	time % which animal stays at the stable
```

## Additional Raw Data

### Aircraft LTO Factors

User note:

- LTO is kept as its own raw batch because it is huge.
- In the DB it will still follow the normal parameter model.
- Raw naming intent: `LTO_{aircraft}`.

```tsv
name	unit	type	value	source
A300_LTO	kgCO2e/LTO	global	5450.0000
A310_LTO	kgCO2e/LTO	global	4760.0000
A319_LTO	kgCO2e/LTO	global	2310.0000
A320_LTO	kgCO2e/LTO	global	2440.0000
A321_LTO	kgCO2e/LTO	global	3020.0000
A330-200/300_LTO	kgCO2e/LTO	global	7050.0000
A340-200_LTO	kgCO2e/LTO	global	5890.0000
A340-300_LTO	kgCO2e/LTO	global	6380.0000
A340-500/600_LTO	kgCO2e/LTO	global	10660.0000
707_LTO	kgCO2e/LTO	global	5890.0000
717_LTO	kgCO2e/LTO	global	2140.0000
727-100_LTO	kgCO2e/LTO	global	3970.0000
727-200_LTO	kgCO2e/LTO	global	4610.0000
737-100/200_LTO	kgCO2e/LTO	global	2740.0000
737-300/400/500_LTO	kgCO2e/LTO	global	2480.0000
737-600_LTO	kgCO2e/LTO	global	2280.0000
737-700_LTO	kgCO2e/LTO	global	2460.0000
737-800/900_LTO	kgCO2e/LTO	global	2780.0000
747-100_LTO	kgCO2e/LTO	global	10140.0000
747-200_LTO	kgCO2e/LTO	global	11370.0000
747-300_LTO	kgCO2e/LTO	global	11080.0000
747-400_LTO	kgCO2e/LTO	global	10240.0000
757-200_LTO	kgCO2e/LTO	global	4320.0000
757-300_LTO	kgCO2e/LTO	global	4630.0000
767-200_LTO	kgCO2e/LTO	global	4620.0000
767-300_LTO	kgCO2e/LTO	global	5610.0000
767-400_LTO	kgCO2e/LTO	global	5520.0000
777-200/300_LTO	kgCO2e/LTO	global	8100.0000
DC-10_LTO	kgCO2e/LTO	global	7290.0000
DC-8-50/60/70_LTO	kgCO2e/LTO	global	5360.0000
DC-9_LTO	kgCO2e/LTO	global	2650.0000
L-101_LTO	kgCO2e/LTO	global	7300.0000
MD-11_LTO	kgCO2e/LTO	global	7290.0000
MD-80_LTO	kgCO2e/LTO	global	3180.0000
MD-90_LTO	kgCO2e/LTO	global	2760.0000
TU-134_LTO	kgCO2e/LTO	global	2930.0000
TU-154-M_LTO	kgCO2e/LTO	global	5960.0000
TU-154-B_LTO	kgCO2e/LTO	global	7030.0000
RJ-RJ85_LTO	kgCO2e/LTO	global	1910.0000
BAE 146_LTO	kgCO2e/LTO	global	1800.0000
CRJ-100ER_LTO	kgCO2e/LTO	global	1060.0000
ERJ-145_LTO	kgCO2e/LTO	global	990.0000
Fokker 100/70/28_LTO	kgCO2e/LTO	global	2390.0000
BAC111_LTO	kgCO2e/LTO	global	2520.0000
Dornier 328 Jet_LTO	kgCO2e/LTO	global	870.0000
Gulfstream IV_LTO	kgCO2e/LTO	global	2160.0000
Gulfstream V_LTO	kgCO2e/LTO	global	1890.0000
Yak-42M_LTO	kgCO2e/LTO	global	2880.0000
Cessna 525/560_LTO	kgCO2e/LTO	global	1070.0000
Beech King Air (5)_LTO	kgCO2e/LTO	global	230.0000
DHC8-100 <6)_LTO	kgCO2e/LTO	global	640.0000
SA.365 Dauphin_LTO	kgCO2e/LTO	global	136.9722
ATR72-500 <7)_LTO	kgCO2e/LTO	global	620.0000
```

### Confined Time Share Defaults

User note:

- These are defaults/fallbacks used by the app.
- They are specific to our case and are both system defaults and fallback values.

```tsv
key	livestock	unit	value	default value (our system)
row-01	dairyCattle	%		100%
row-02	otherCattle	%		75%
row-03	sheep	%		80%
row-04	goats	%		80%
row-05	horses	%		0%
row-06	donkeysMules	%		0%
row-07	camels	%		0%
row-08	broilers	%		75%
row-09	layingHens	%		100%
row-10	turkeys	%		100%
```

### Synthetic Fertilizer Tenure Defaults

User note:

- Only the tenure `%` is relevant as parameter data.
- The yearly `t` columns are activity data and should be ignored for parameter modeling.
- This batch is messy in the raw source and is preserved as provided.

```tsv
key	fertilizer	unit	y-2019	y-2020	y-2021	tennure(valeur par defaut)
row-01	ammonitrate	t	43.8986	43.3550	42.8182	34%
row-02	dap	t			42.8182	18%
row-03	Urea	t	0.0000	0.0000	0.0000	46%
```
