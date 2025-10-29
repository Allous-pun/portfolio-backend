import Skill from "../models/Skill.js";

// @desc    Get skills (all, filtered, and sorted)
// @route   GET /api/skills?category=technical&search=react&sort=level
// @access  Public
export const getSkills = async (req, res) => {
  try {
    const { category, search, sort } = req.query;

    // Build dynamic filter
    const filter = {};
    if (category) filter.category = category.toLowerCase();
    if (search) filter.name = { $regex: search, $options: "i" };

    // Determine sort options
    const sortOptions = {};
    if (sort) {
      // Example: ?sort=name or ?sort=-level
      const sortFields = sort.split(",").map(field => field.trim());
      sortFields.forEach(field => {
        if (field.startsWith("-")) sortOptions[field.substring(1)] = -1;
        else sortOptions[field] = 1;
      });
    } else {
      // Default sorting
      sortOptions.category = 1;
      sortOptions.name = 1;
    }

    // Fetch filtered + sorted skills
    const skills = await Skill.find(filter).sort(sortOptions);

    // Grouping for convenience
    const technical = skills.filter(skill => skill.category === "technical");
    const nonTechnical = skills.filter(skill => skill.category === "non-technical");

    res.status(200).json({
      success: true,
      total: skills.length,
      technicalCount: technical.length,
      nonTechnicalCount: nonTechnical.length,
      technical,
      nonTechnical,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new skill
// @route   POST /api/skills
// @access  Private
export const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json({ success: true, skill });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private
export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!skill)
      return res.status(404).json({ success: false, message: "Skill not found" });

    res.status(200).json({ success: true, skill });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private
export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill)
      return res.status(404).json({ success: false, message: "Skill not found" });

    res.status(200).json({ success: true, message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
